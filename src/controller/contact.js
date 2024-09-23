import Contact from "../model/contact.js";
import emailValidator from "email-validator";

export const post_contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please provide all required fields",
        status: 400,
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        message: "Message must be at least 10 characters long",
        status: 400,
      });
    }

    const findEmail = await Contact.findOne({
      $or: [{ email }, { name }],
    });

    if (findEmail) {
      findEmail.message.push(message); // Assuming message is an array in the model
      await findEmail.save();
      return res.status(200).json({
        message: "Message posted successfully",
        status: 200,
      });
    }

    const newContact = new Contact({ name, email, message: [message] });
    await newContact.save();

    return res.status(201).json({
      message: "Contact added successfully",
      status: 201,
    });
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

export const delete_contact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Contact deleted successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
      status: 500,
    });
  }
};
