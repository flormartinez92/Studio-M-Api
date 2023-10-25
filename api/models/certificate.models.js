const { Schema, model } = require("mongoose");

const CertificateSchema = new Schema({
  description: {
    type: String,
    required: [false /* , "description is required" */],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  courseId: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "Course is required"],
      ref: "Course",
    },
  ],
});

const Certificate = model("Certificate", CertificateSchema);

module.exports = Certificate;
