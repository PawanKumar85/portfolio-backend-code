// email.controller.js
import { sendMail } from "../helper/emailer.js"; // Ensure the path is correct

// Function to validate input fields
const validateInput = (name, email, message) => {
  const errors = [];

  if (name.length < 2) {
    errors.push("Name should be at least 2 characters long");
  }
  if (message.length < 10) {
    errors.push("Message should be at least 10 characters long");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("A valid email is required");
  }

  return errors;
};

// Function to send email
export const sendEmail = async (req, res) => {
  try {
    // Trim the input fields
    let { name, email, message } = req.body;
    name = name.trim();
    email = email.trim();
    message = message.trim();

    // Validate input
    const validationErrors = validateInput(name, email, message);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: validationErrors.join(", "),
        status: 400,
      });
    }

    // Send the email
    const emailResponse = await sendMail(
      `${name} <${email}>`, // From field with sender's name
      "New Query Added from Portfolio",
      `Name: ${name}\nEmail: ${email}`,
      `<p>${message}</p>`
    );

    // Check if email was sent successfully
    if (emailResponse.success) {
      return res.json({
        message: "Email sent successfully",
        status: 200,
        messageId: emailResponse.messageId, // Include the message ID
      });
    } else {
      // Handle the error if the email sending failed
      return res.status(400).json({
        message: "Failed to send email",
        status: 400,
        error: emailResponse.error || "An unknown error occurred", // Fallback error message
      });
    }
  } catch (error) {
    console.error("Error in sendEmail:", error); // Log unexpected errors
    return res.status(500).json({
      message: "Failed to send email",
      status: 500,
      error: error.message,
    });
  }
};
