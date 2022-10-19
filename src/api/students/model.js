import mongoose from "mongoose";

const { Schema, model } = mongoose;

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  },

  {
    timestamps: true,
  }
);

export default model("Student", StudentSchema);
