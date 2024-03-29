const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");

//User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is Required"],
  },
  email: {
    type: String,
    require: [true, "Username is Required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is Required"],
    minlength: [6, "password length should be  6 character long"],
  },
  customerID: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match password
userSchema.methods.matchPassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

// SIGN TOKEN
userSchema.methods.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
  );

  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN }
  );
  // Save the token in cookie

  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });
};
const User = mongoose.model("user", userSchema);

module.exports = User;
