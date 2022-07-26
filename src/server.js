import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listUrl from "express-list-endpoints";
import usersRouter from "./api/users/index.js";
import coursesRouter from "./api/courses/index.js";
import carouselRouter from "./api/carousel/index.js";
import profileRouter from "./api/profile/index.js";
import {
  badRequestHandler,
  forbiddenHandler,
  unauthorizedHandler,
  notFoundHandler,
  catchAllHandler,
} from "./errorHandler.js";

const app = express();

const port = process.env.PORT || 4001;

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);
app.use("/carousel", carouselRouter);
//app.use("/Admin", adminRouter);
app.use("/courses", coursesRouter);
//app.use("/Teacher", teachersRouter);
//app.use("Student", studentsRouter);
app.use("/profile", profileRouter);

app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(forbiddenHandler);
app.use(notFoundHandler);
app.use(catchAllHandler);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Mongo connection established");
  app.listen(port, () => {
    console.table(listUrl(app));
    console.log(`Server listening on port ${port}`);
  });
});
