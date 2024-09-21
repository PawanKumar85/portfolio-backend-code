import express from "express";
import {
  delete_education,
  get_education,
  patch_education,
  post_education,
} from "../controller/education.js";
const education = express.Router();

education.get("/education", get_education).post("/education", post_education);

education.patch("/education/:id", patch_education);
education.delete("/education/:id", delete_education);

export default education;
