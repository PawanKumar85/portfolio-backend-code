import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: [String],
      required: true,
      minLength: 10,
      maxLength: 500,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
