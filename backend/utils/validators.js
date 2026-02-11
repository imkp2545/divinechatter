const validator = require("validator");

const isValidEmail = (email) => validator.isEmail(String(email || "").trim());
const isStrongPassword = (pw) => typeof pw === "string" && pw.length >= 8;

module.exports = { isValidEmail, isStrongPassword };