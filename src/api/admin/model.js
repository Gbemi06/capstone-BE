import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  path: { type: String },
  originalname: { type: String },
  title: { type: String },
  message: { type: String },
});

export default model("Admin", AdminSchema);
