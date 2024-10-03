// emailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use correct SMTP host for Gmail
  port: 587, // Use 587 for TLS
  secure: false, // Set to true for port 465
  auth: {
    user: process.env.USER, // Your email
    pass: process.env.PASS, // Your email password or app password
  },
});

// Function to send email
export const sendMail = async (from, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from, // Sender address
      to: `${process.env.USER}`, // Recipient address
      subject, // Subject line
      text, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #333;">New Query from Portfolio</h2>
          <p style="font-size: 16px; color: #555;">
            <strong>Name:</strong> ${from.split("<")[0]}<br />
            <strong>Email:</strong> ${from.split("<")[1].slice(0, -1)}<br />
          </p>
          <p style="font-size: 16px; color: #555;">
            <strong>Message:</strong>
          </p>
          <div style="padding: 10px; background-color: #fff; border: 1px solid #ddd; border-radius: 4px;">
            ${html}
          </div>
        </div>
      `, // HTML body
    });
    console.log("Email sent:", info.messageId); // Log success
    return { success: true, messageId: info.messageId }; // Return success response
  } catch (error) {
    console.error("Error sending email:", error); // Log error
    return { success: false, error: error.message }; // Return error response
  }
};
