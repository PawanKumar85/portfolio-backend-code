import express from "express";
import {
  get_contact,
  post_contact,
  delete_contact,
  get_single_contact,
} from "../controller/contact.js";
const router = express.Router();

router
  .post("/contact", post_contact)
  .get("/contact", get_contact)
  .delete("/:id", delete_contact)
  .get("/:id", get_single_contact);

export default router;
cd