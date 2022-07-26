import express from "express";
import { tokenAuth } from "../../auth/token.js";
import { generateToken } from "../../auth/tools.js";
import UserModel from "./model.js";

const usersRouter = express.Router();

// Login endpoint
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const newUser = await UserModel.checkCredentials(username, password);
    // console.log(newUser);

    if (newUser) {
      const token = await generateToken({
        _id: newUser._id,
        role: newUser.role,
        username: newUser.username,
      });
      res.send({
        token,
        role: newUser.role,
      });
    } else {
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
});

// Register endpoint
usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    console.log(newUser);

    if (newUser) {
      const token = await generateToken({
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      });
      res.send({ token });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/register/me", tokenAuth, async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id } = req.user;
    const user = await UserModel.findById(_id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:role", async (req, res, next) => {
  try {
    const { role } = req.params;
    console.log(role);
    const users = await UserModel.find({ role });
    console.log(users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await UserModel.findByIdAndUpdate(id, req.body);
    console.log(user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const users = await UserModel.findByIdAndDelete(req.params.id);
    console.log(users);
    res.send("User deleted");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
