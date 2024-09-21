import express from "express";
import { get_about, post_about } from "../controller/about.js";
import { upload } from "./../middleware/multer.js";

const about = express.Router();

about.route("/about").post(
  upload.fields([
    {
      name: "imageUrl",
      maxCount: 1,
    },
  ]),
  post_about
);

about.get("/about",get_about);

export default about;
