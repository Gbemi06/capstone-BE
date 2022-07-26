import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProfileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    avatar: { type: String, required: true },
    about: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    profilePicture: { type: String, required: true },
    coverPicture: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model("Profile", ProfileSchema);
