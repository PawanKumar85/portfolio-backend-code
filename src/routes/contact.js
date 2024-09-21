import express from "express";
import {
  get_contact,
  post_contact,
  delete_contact,
  get_single_contact,
} from "../controller/contact.js";
const contact = express.Router();

contact
  .post("/contacts", post_contact)
  .get("/contacts", get_contact)
  .delete("/:id", delete_contact)
  .get("/:id", get_single_contact);

export default contact;
