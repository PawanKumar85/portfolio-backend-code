import Contact from "../model/contact.js";
import connectDB from "../config/database.js";
import emailValidator from "email-validator";

connectDB();

export const post_contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailValidator.validate(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Contact created" });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
      status: 500,
    });
  }
};

export const get_contact = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json({
      success: true,
      contacts,
      total: contacts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
      status: 500,
    });
  }
};

export const get_single_contact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ success: true, contact });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message
    });
  }
};

export const delete_contact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
      status: 500,
    });
  }
};
