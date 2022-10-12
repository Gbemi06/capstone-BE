import express from "express";
import { tokenAuth } from "../../auth/token.js";
import ProfileModel from "../profile/model.js";

const profileRouter = express.Router();

profileRouter.get("/", tokenAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const profile = await ProfileModel.findById(_id);
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.get("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await ProfileModel.findById(id);
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.post("/", tokenAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const profile = await ProfileModel.findByIdAndUpdate(_id, req.body);
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.put("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await ProfileModel.findByIdAndUpdate(id, req.body);
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.delete("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProfileModel.findByIdAndDelete(id);
    res.send("Profile deleted");
  } catch (error) {
    next(error);
  }
});

profileRouter.get("/:id/courses", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await ProfileModel.findById(id).populate("courses");
    res.send(profile.courses);
  } catch (error) {
    next(error);
  }
});

profileRouter.post("/:id/courses", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const profile = await ProfileModel.findById(id);
    const user = await ProfileModel.findById(_id);
    if (profile._id.toString() === user._id.toString()) {
      profile.courses.push(req.body);
      await profile.save();
      res.send(profile);
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.put(
  "/:id/courses/:courseId",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { id, courseId } = req.params;
      const { _id } = req.user;
      const profile = await ProfileModel.findById(id);
      const user = await ProfileModel.findById(_id);
      if (profile._id.toString() === user._id.toString()) {
        const course = profile.courses.find(
          (c) => c._id.toString() === courseId
        );
        if (course) {
          const index = profile.courses.indexOf(course);
          profile.courses[index] = req.body;
          await profile.save();
          res.send(profile);
        } else {
          res.status(404).send("Course not found");
        }
      } else {
        res.status(403).send("Forbidden");
      }
    } catch (error) {
      next(error);
    }
  }
);

profileRouter.delete(
  "/:id/courses/:courseId",
  tokenAuth,
  async (req, res, next) => {
    try {
      const { id, courseId } = req.params;
      const { _id } = req.user;
      const profile = await ProfileModel.findById(id);
      const user = await ProfileModel.findById(_id);
      if (profile._id.toString() === user._id.toString()) {
        const course = profile.courses.find(
          (c) => c._id.toString() === courseId
        );
        if (course) {
          const index = profile.courses.indexOf(course);
          profile.courses.splice(index, 1);
          await profile.save();
          res.send(profile);
        } else {
          res.status(404).send("Course not found");
        }
      } else {
        res.status(403).send("Forbidden");
      }
    } catch (error) {
      next(error);
    }
  }
);

export default profileRouter;
