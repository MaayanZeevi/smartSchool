const { Router } = require("express");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../database/models/User");
const { hashPassword, comparePassword } = require("../utils/helpers");
const { sendPasswordResetEmail } = require("../utils/emailService");
const Class = require("../database/models/Class");

const router = Router();

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logout successful" });
  });
});

router.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json(req.user);
});

router.post("/login/kid", async (req, res) => {
  if (req.user.role !== "parent")
    return res.status(401).json({ message: "Not authenticated" });

  const childId = req.body.childId;
  try {
    const userDB = await User.findOne({ userId: childId });
    if (!userDB) {
      throw new Error("משתמש לא נמצא");
    }
    res.status(200).json(userDB);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      userId,
      role,
      firstName,
      lastName,
      classDetails,
      phoneNumber,
      address,
      children,
    } = req.body;

    const userDB = await User.findOne({ $or: [{ userId, email }] });

    if (userDB) {
      res.status(400).send({ message: "User already exists!" });
    } else {
      const password = hashPassword(req.body.password);
      await User.create({
        password,
        email,
        userId,
        role,
        firstName,
        lastName,
        classDetails,
        phoneNumber,
        address,
        children,
      });

      const isClassExist = await Class.findOne({ name: classDetails });

      if (!isClassExist) {
        await Class.create({ name: classDetails });
      }

      if (role === "student") {
        await Class.updateOne(
          { name: classDetails },
          {
            $push: {
              studentsIds: { id: userId, name: `${firstName} ${lastName}` },
            },
          }
        );
      }

      res.sendStatus(201);
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();
    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "error resetting password" });
  }
});

router.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).render("InvalidToken");
    }

    res.render("ResetPassword", {
      token,
      error: undefined,
      success: undefined,
    });
    // res.status(200).json({message: "Good shit"})
  } catch (error) {
    res.render("ResetPassword", {
      token,
      error: "שגיאה באיפוס הסיסמה",
      success: undefined,
    });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).render("InvalidToken");
    }

    if (password !== confirmPassword) {
      return res.status(500).render("ResetPassword", {
        token,
        error: "הסיסמאות לא תואמות",
        success: undefined,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).render("ResetPassword", {
      token,
      error: undefined,
      success: "סיסמה אופסה בהצלחה",
    });
  } catch (error) {
    res.status(500).render("ResetPassword", {
      token,
      error: "שגיאה באיפוס הסיסמה",
      success: undefined,
    });
  }
});

module.exports = router;
