import express from "express";
import UserModel from "./model.js";
import CarouselModel from "./model.js";
import { adminOnlyMiddleware } from "../../auth/adminOnly.js";
import { teacherOnlyMiddleware } from "../../auth/teacherOnly.js";
import { tokenAuth } from "../../auth/token.js";
import multer from "multer";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import pkg2 from "multer-storage-cloudinary";
const { CloudinaryStorage } = pkg2;

const carouselRouter = express.Router();

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

carouselRouter.post("/", carouselUpload, async (req, res, next) => {
  try {
    console.log(req.file);
    const { path, originalname } = req.file;
    console.log(path);
    const newCarousel = new CarouselModel({
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

carouselRouter.get("/", carouselUpload, async (req, res, next) => {
  try {
    const carousel = await CarouselModel.find({ type: "carousel" });
    res.send(carousel);
  } catch (error) {
    next(error);
  }
});

carouselRouter.get("/:id", carouselUpload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const carousel = await CarouselModel.findById(id);
    res.send(carousel);
  } catch (error) {
    next(error);
  }
});

carouselRouter.put("/:id", carouselUpload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const carousel = await CarouselModel.findByIdAndUpdate(id, req.body);
    res.send(carousel);
  } catch (error) {
    next(error);
  }
});

carouselRouter.delete("/:id", carouselUpload, async (req, res, next) => {
  try {
    const { id } = req.params;
    await CarouselModel.findByIdAndDelete(id);
    res.send("Carousel deleted");
  } catch (error) {
    next(error);
  }
});

export default carouselRouter;
