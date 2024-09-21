import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
