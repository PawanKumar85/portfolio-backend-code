import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
