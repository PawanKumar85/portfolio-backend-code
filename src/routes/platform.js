import express from "express";
import {
  get_platforms,
  post_platform,
  patch_platform,
  delete_platform,
} from "../controller/platform.js";
import { upload } from "./../middleware/multer.js";

const platform = express.Router();

platform
  .post(
    "/platform",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    post_platform
  )
  .get("/platform", get_platforms)
  .delete("/platform/:id", delete_platform)
  .patch(
    "/platform/:id",
    upload.fields([{ name: "imageUrl", maxCount: 1 }]),
    patch_platform
  );

export default platform;
