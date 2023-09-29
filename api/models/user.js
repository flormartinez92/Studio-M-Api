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
    console.log(error);;
  }
};

UserSchema.methods.generateHash = async (password, salt) => {
  return bcrypt.hash(password, salt);
};

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    
    this.salt = salt;
    this.password = await this.generateHash(this.password, salt);

    next();
  } catch (error) {
    return next(error);
  }
});

const User = model("User", UserSchema);

module.exports = User;
