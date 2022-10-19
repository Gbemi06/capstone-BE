import express from "express";
import { tokenAuth } from "../../auth/token.js";
import TeacherModel from "./model.js";

const teachersRouter = express.Router();

teachersRouter.get("/", tokenAuth, async (req, res, next) => {
  try {
    const teachers = await TeacherModel.find();
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

teachersRouter.get("/:teacherId", tokenAuth, async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await TeacherModel.findById(teacherId);
    res.send(teacher);
  } catch (error) {
    next(error);
  }
});

// teachersRouter.post("/", tokenAuth, async (req, res, next) => {
//     try {
//         const newTeacher = new TeacherModel(req.body);
//         const { _id } = await newTeacher.save();
//         res.send({ _id });
//     } catch (error) {
//         next(error);
//     }
// }
// );

teachersRouter.put("/:teacherId", tokenAuth, async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await TeacherModel.findByIdAndUpdate(teacherId, req.body);
    res.send(teacher);
  } catch (error) {
    next(error);
  }
});

teachersRouter.delete("/:teacherId", tokenAuth, async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    await TeacherModel.findByIdAndDelete(teacherId);
    res.send("Teacher deleted");
  } catch (error) {
    next(error);
  }
});

// to get all the courses of a teacher
teachersRouter.get("/:teacherId/courses", tokenAuth, async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await TeacherModel.findById(teacherId).populate("courses");
    res.send(teacher.courses);
  } catch (error) {
    next(error);
  }
});

// to get all the students of a teacher
teachersRouter.get(
  "/:teacherId/courses/:courseId",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { teacherId, courseId } = req.params;
      const teacher = await TeacherModel.findById(teacherId).populate(
        "courses"
      );
      const course = teacher.courses.find(
        (course) => course._id.toString() === courseId
      );
      res.send(course);
    } catch (error) {
      next(error);
    }
  }
);

// to get all the students of a teacher in a specific course
teachersRouter.get(
  "/:teacherId/courses/:courseId/students",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { teacherId, courseId } = req.params;
      const teacher = await TeacherModel.findById(teacherId).populate(
        "courses"
      );
      const course = teacher.courses.find(
        (course) => course._id.toString() === courseId
      );
      res.send(course.students);
    } catch (error) {
      next(error);
    }
  }
);

// to get the details of a students in a specific course
teachersRouter.get(
  "/:teacherId/courses/:courseId/students/:studentId",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { teacherId, courseId, studentId } = req.params;
      const teacher = await TeacherModel.findById(teacherId).populate(
        "courses"
      );
      const course = teacher.courses.find(
        (course) => course._id.toString() === courseId
      );
      const student = course.students.find(
        (student) => student._id.toString() === studentId
      );
      res.send(student);
    } catch (error) {
      next(error);
    }
  }
);

// to get the grades of a students in a specific course
teachersRouter.get(
  "/:teacherId/courses/:courseId/students/:studentId/grades",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { teacherId, courseId, studentId } = req.params;
      const teacher = await TeacherModel.findById(teacherId).populate(
        "courses"
      );
      const course = teacher.courses.find(
        (course) => course._id.toString() === courseId
      );
      const student = course.students.find(
        (student) => student._id.toString() === studentId
      );
      res.send(student.grades);
    } catch (error) {
      next(error);
    }
  }
);

// to post the  grade of a students in a specific course
teachersRouter.post(
  "/:teacherId/courses/:courseId/students/:studentId/grades",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { teacherId, courseId, studentId } = req.params;
      const teacher = await TeacherModel.findById(teacherId).populate(
        "courses"
      );
      const course = teacher.courses.find(
        (course) => course._id.toString() === courseId
      );
      const student = course.students.find(
        (student) => student._id.toString() === studentId
      );
      student.grades.push(req.body);
      await teacher.save();
      res.send(student.grades);
    } catch (error) {
      next(error);
    }
  }
);

// to edit the  grade of a students in a specific course
teachersRouter.put(
  "/:teacherId/courses/:courseId/students/:studentId/grades/:gradeId",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { teacherId, courseId, studentId, gradeId } = req.params;
      const teacher = await TeacherModel.findById(teacherId).populate(
        "courses"
      );
      const course = teacher.courses.find(
        (course) => course._id.toString() === courseId
      );
      const student = course.students.find(
        (student) => student._id.toString() === studentId
      );
      const grade = student.grades.find(
        (grade) => grade._id.toString() === gradeId
      );
      const index = student.grades.indexOf(grade);
      student.grades[index] = req.body;
      await teacher.save();
      res.send(student.grades);
    } catch (error) {
      next(error);
    }
  }
);

teachersRouter.get("/:/students", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherModel.findById(id).populate("students");
    res.send(teacher.students);
  } catch (error) {
    next(error);
  }
});

teachersRouter.get("/:id/assignments", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherModel.findById(id).populate("assignments");
    res.send(teacher.assignments);
  } catch (error) {
    next(error);
  }
});

export default teachersRouter;
