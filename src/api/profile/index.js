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
    const profile = await ProfileModel.findByIdAndDelete(id);
    res.send("Profile deleted");
  } catch (error) {
    next(error);
  }
});

export default profileRouter;
