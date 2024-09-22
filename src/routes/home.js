import express from "express";
import { upload } from "./../middleware/multer.js";
import { get_Home, patch_Home, post_home } from "../controller/home.js";

const home = express.Router();

home
  .post(
    "/home",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    post_home
  )
  .get("/home", get_Home)
  .patch(
    "/home/:id",
    upload.fields([
      { name: "imageUrl", maxCount: 1 },
    ]),
    patch_Home
  );
export default home;
