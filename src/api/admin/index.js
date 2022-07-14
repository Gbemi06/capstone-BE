import express from "express";
import UserModel from "./model.js";
import AdminModel from "./model.js";
import { adminOnlyMiddleware } from "../../auth/adminOnly.js";
import { teacherOnlyMiddleware } from "../../auth/teacherOnly.js";
import { tokenAuth } from "../../auth/token.js";
import multer from "multer";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import pkg2 from "multer-storage-cloudinary";
const { CloudinaryStorage } = pkg2;

const adminRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const carouselUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "carousel-uploads",
      // allowedFormats: ["jpg", "png"],
      // transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
  }),
}).single("avatar");

adminRouter.post("/carousel", carouselUpload, async (req, res, next) => {
  try {
    console.log(req.file);
    const { path, originalname } = req.file;
    console.log(path);
    const newCarousel = new AdminModel({
      path,
      originalname,
      type: "carousel",
    });
    const { _id } = await newCarousel.save();
    res.send({ _id, originalname });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/carousel", carouselUpload, async (req, res, next) => {
  try {
    const carousel = await AdminModel.find({ type: "carousel" });
    res.send(carousel);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/carousel/:id", carouselUpload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const carousel = await AdminModel.findById(id);
    res.send(carousel);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/carousel/:id", carouselUpload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const carousel = await AdminModel.findByIdAndUpdate(id, req.body);
    res.send(carousel);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/carousel/:id", carouselUpload, async (req, res, next) => {
  try {
    const { id } = req.params;
    await AdminModel.findByIdAndDelete(id);
    res.send("Carousel deleted");
  } catch (error) {
    next(error);
  }
});

export default adminRouter;
