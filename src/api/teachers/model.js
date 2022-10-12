import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TeacherSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    rank: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default model("Teacher", TeacherSchema);
