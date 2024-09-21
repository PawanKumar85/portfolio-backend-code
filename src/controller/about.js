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

  // const imageLocalPath = req.files?.imageUrl[0]?.path;
  const imageLocalPath = req.files?.imageUrl?.[0]?.path;

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
    const aboutData = await About.find({});

    if (!aboutData || aboutData.length === 0) {
      return res.status(404).json({ message: "No About data found" });
    }

    return res
      .status(200)
      .json({
        message: "About data fetched successfully",
        data: aboutData,
        total: aboutData.length,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
};

export const patch_about = asyncHandler(async (req, res) => {
  const { id } = req.params; // The ID of the about data to be updated
  const { title, description } = req.body;

  try {
    // Find the existing About entry by ID
    const aboutData = await About.findById(id);

    if (!aboutData) {
      return res.status(404).json({ message: "About data not found" });
    }

    // If a new title is provided, check if it's unique
    if (title && title !== aboutData.title) {
      const existingTitle = await About.findOne({ title });
      if (existingTitle) {
        return res.status(400).json({ message: "Title already exists" });
      }
      aboutData.title = title; // Update the title
    }

    // Update the description if provided
    if (description) {
      aboutData.description = description;
    }

    // Handle image upload if a new image is provided
    if (req.files?.imageUrl?.[0]?.path) {
      const imageLocalPath = req.files.imageUrl[0].path;
      const image = await uploadOnCloudinary(imageLocalPath);

      if (!image) {
        return res
          .status(500)
          .json({ message: "Error uploading image to cloudinary" });
      }

      // Update the imageUrl with the new image URL
      aboutData.imageUrl = image.url;
    }

    // Save the updated About data
    const updatedAbout = await aboutData.save();

    return res.status(200).json({
      message: "About data updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export const get_single_about = asyncHandler(async (req, res) => {
  const { id } = req.params; // The ID of the about data to fetch

  try {
    // Find the About entry by ID
    const aboutData = await About.findById(id);

    if (!aboutData) {
      return res.status(404).json({
        success: false,
        message: "About data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "About data fetched successfully",
      data: aboutData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export const delete_about = asyncHandler(async (req, res) => {
  const { id } = req.params; // The ID of the about data to delete

  try {
    // Find the About entry by ID and delete it
    const deletedAbout = await About.findByIdAndDelete(id);

    if (!deletedAbout) {
      return res.status(404).json({
        success: false,
        message: "About data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "About data deleted successfully",
      data: deletedAbout, // Optionally return the deleted data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});
