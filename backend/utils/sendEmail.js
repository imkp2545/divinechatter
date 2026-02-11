const transporter = require("../config/nodemailer");

module.exports = async ({ to, subject, html, text }) => {
  
  if (process.env.DISABLE_EMAIL === "true") {
    console.log("[EMAIL DISABLED]", { to, subject, text });
    return { disabled: true };
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  });

  return info;
};