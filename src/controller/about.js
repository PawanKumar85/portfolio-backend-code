import { asyncHandler } from "../utils/asyncHandler.js";
import About from "./../model/about.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const post_about = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingTitle = await About.findOne({ title });

  if (existingTitle) {
    return res.status(400).json({ message: "Title already exists" });
  }

  const imageLocalPath = req.files?.imageUrl[0]?.path;

  if (!imageLocalPath) {
    return res.status(400).json({ message: "Image is required" });
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    return res
      .status(500)
      .json({ message: "Error uploading image to cloudinary" });
  }

  const newAbout = new About({
    title,
    description,
    imageUrl: image.url,
  });

  const save = await newAbout.save();

  if (!save) {
    return res.status(500).json({ message: "Error saving about data" });
  }

  return res.status(201).json({
    message: "About data created successfully",
    data: newAbout,
  });
});

export const get_about = async (req, res) => {
    try {
      const about = await About.find({});
  
      if (!about || about.length === 0) {
        return res.status(404).json({
          message: "No About data found",
          data: [],
        });
      }
  
      return res.status(200).json({
        message: "About data fetched successfully",
        data: about,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
        status: 500,
      });
    }
  };
  
