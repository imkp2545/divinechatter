const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      index: true
    },
    password: { type: String, required: true, select: false },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// IMPORTANT: use `function` to preserve `this`
// IMPORTANT: in async hooks, you can omit `next`
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);