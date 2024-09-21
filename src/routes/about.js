import express from "express";
import {
  delete_about,
  get_about,
  get_single_about,
  patch_about,
  post_about,
} from "../controller/about.js";
import { upload } from "./../middleware/multer.js";

const about = express.Router();

about
  .post(
    "/about",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    post_about
  )
  .get("/about", get_about)
  .get("/about/:id", get_single_about)
  .delete("/about/:id", delete_about)
  .patch(
    "/about/:id",
    upload.fields([{ name: "imageUrl", maxCount: 1 }]),
    patch_about
  );

export default about;
