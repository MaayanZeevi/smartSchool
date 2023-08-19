const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPasswordResetEmail = async (email, token) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "איפוס סיסמה",
      text: `ביקשת לאפס את הסיסמה שלך. לחץ על הקישור למטה כדי לאפס את הסיסמה שלך.\n\n http://localhost:3001/auth/reset-password/${token}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
