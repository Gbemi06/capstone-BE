import express from "express";
// import { adminOnlyMiddleware } from "../../auth/adminOnly.js";
import { teacherOnlyMiddleware } from "../../auth/teacherOnly.js";
import { tokenAuth } from "../../auth/token.js";

const coursesRouter = express.Router();

// Login endpoint
coursesRouter.post("/", tokenAuth, async (req, res, next) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});

export default coursesRouter;
