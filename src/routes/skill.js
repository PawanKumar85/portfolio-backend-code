import express from "express";
import { upload } from "./../middleware/multer.js";
import {
  post_skill,
  get_skill,
  patch_skill,
  delete_skill,
} from "../controller/skills.js";

const skill = express.Router();

skill
  .post(
    "/skill",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    post_skill
  )
  .get("/skill", get_skill)
  .delete("/skill/:id", delete_skill)
  .patch(
    "/skill/:id",
    upload.fields([{ name: "imageUrl", maxCount: 1 }]),
    patch_skill
  );

export default skill;
