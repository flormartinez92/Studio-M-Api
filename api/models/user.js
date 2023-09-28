const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  dni: {
    type: Number,
    required: [true, "Dni is required"],
  },
  mail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  salt: {
    type: String,
    required: [false],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
  },
});

UserSchema.methods.validatorPassword = async function (password) {
  try {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  } catch (error) {
    return false;
  }
};

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(this.password, salt);
    this.salt = salt;
    this.password = password;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("User", UserSchema);
