import express from "express";
import CourseModel from "./model.js";
// import { adminOnlyMiddleware } from "../../auth/adminOnly.js";
import { teacherOnlyMiddleware } from "../../auth/teacherOnly.js";
import { tokenAuth } from "../../auth/token.js";

const coursesRouter = express.Router();

// Login endpoint
coursesRouter.post("/", async (req, res, next) => {
  try {
    const newCourse = new CourseModel(req.body);
    const { _id } = await newCourse.save();
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});

coursesRouter.get("/", async (req, res, next) => {
  try {
    const courses = await CourseModel.find();
    res.send(courses);
  } catch (error) {
    next(error);
  }
});

coursesRouter.get("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id);
    res.send(course);
  } catch (error) {
    next(error);
  }
});

coursesRouter.put("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findByIdAndUpdate(id, req.body);
    res.send(course);
  } catch (error) {
    next(error);
  }
});

coursesRouter.delete("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findByIdAndDelete(id);
    console.log(course);
    res.send("Course deleted");
  } catch (error) {
    next(error);
  }
});

export default coursesRouter;
