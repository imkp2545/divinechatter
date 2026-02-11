const nodemailer = require("nodemailer");

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT || 587);

if (!host || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn(
    "Email env missing. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS"
  );
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// optional: verify connection in dev
if (process.env.NODE_ENV !== "production") {
  transporter.verify().then(
    () => console.log("SMTP ready:", host, port),
    (err) => console.log("SMTP not ready:", err.message)
  );
}

module.exports = transporter;