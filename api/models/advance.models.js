const { Schema, model } = require("mongoose");
/*sd  */
const classAdvance = new Schema({
  classId: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "classId is required"],
      ref: "Course",
    },
  ],
  status: {
    type: Boolean,
    required: [true, "status is required"],
  },
});

const CourseAdvanceSchema = new Schema({
  userId: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
  ],
  classesAdvance: {
    type: [classAdvance],
    required: [true, "class Advance is required"],
  },
});

const CourseAdvance = model("CourseAdvance", CourseAdvanceSchema);

module.exports = CourseAdvance;
