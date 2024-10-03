import express from "express";
import { sendEmail } from "../controller/contact.js";
const contact = express.Router();

contact.post("/contacts", sendEmail);

export default contact;