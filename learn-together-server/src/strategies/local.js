const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../database/models/User");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "userId",
      passReqToCallback: true,
    },
    async (req, userId, password, done) => {
      try {
        const { role } = req.body;
        if (!userId || !password || !role)
          throw new Error("Missing credentials");
        const userDB = await User.findOne({ userId });
        if (!userDB) {
          throw new Error("משתמש לא נמצא");
        }
        const isValid =
          comparePassword(password, userDB.password) && role === userDB.role;
        if (isValid) {
          done(null, userDB);
        } else {
          done(null, null);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
