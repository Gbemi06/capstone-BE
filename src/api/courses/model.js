import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true },
    term: { type: String, required: true },
    year: { type: Number, required: true },
    instructor: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

CourseSchema.static("checkCredentials", async function (username, plainPW) {
  const aCourse = await this.findOne({ username }); // "this" here refers to the UsersModel

  console.log(aCourse);

  if (aCourse) {
    const isMatch = await bcrypt.compare(plainPW, user.password);

    if (isMatch) {
      return aCourse;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model("Course", CourseSchema);
