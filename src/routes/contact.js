import express from "express";
import {
  get_contact,
  post_contact,
  delete_contact,
} from "../controller/contact.js";
const contact = express.Router();

contact
  .post("/contacts", post_contact)
  .get("/contacts", get_contact)
  .delete("/contacts/:id", delete_contact);

export default contact;
