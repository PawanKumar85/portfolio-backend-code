import express from "express";
import {
  get_SocialMediaLinks,
  post_SocialMediaLink,
} from "../controller/socialMedia.js";
import { upload } from "./../middleware/multer.js";

const social = express.Router();

social
.post(
    "/social",
    upload.fields([
      {
        name: "icon",
        maxCount: 1,
      },
    ]),
    post_SocialMediaLink
  )
  .get("/social", get_SocialMediaLinks);
//   .get("/about/:id", get_single_about)
//   .delete("/about/:id", delete_about)
//   .patch(
//     "/about/:id",
//     upload.fields([{ name: "imageUrl", maxCount: 1 }]),
//     patch_about
//   );

export default social;
