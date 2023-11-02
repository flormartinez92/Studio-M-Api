const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const Classes = new Schema({
  classId: {
    type: String,
    required: [true, "classId is required"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Course = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    required: [true, "Course is required"],
    ref: "Course",
  },
  classes: {
    type: [Classes],
    required: [true, "Classes is required"],
  },
});

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
  profileImg: {
    type: String,
    default: "",
  },
  course: {
    type: [Course],
    required: [true, "Course is required"],
  },
});

UserSchema.methods.validatorPassword = async function (password) {
  try {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  } catch (error) {
    console.log(error);
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
