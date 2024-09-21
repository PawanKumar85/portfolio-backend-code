import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import contact from "./routes/contact.js";
import about from "./routes/about.js";
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v2/portfolio", contact);
app.use("/api/v2/portfolio", about);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
