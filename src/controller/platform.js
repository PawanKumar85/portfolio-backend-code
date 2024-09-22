import Platform from "../model/platform.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const post_platform = asyncHandler(async (req, res) => {
  const { title, description, link } = req.body;

  if (!title || !description || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingTitle = await Platform.findOne({ title });

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

  const newAbout = new Platform({
    title,
    description,
    link,
    imageUrl: image.url,
  });

  const save = await newAbout.save();

  if (!save) {
    return res.status(500).json({ message: "Error saving about data" });
  }

  return res.status(201).json({
    message: "Platform data created successfully",
    data: newAbout,
  });
});

export const get_platforms = asyncHandler(async (req, res) => {
  const platforms = await Platform.find({});
  if (!platforms || platforms.length === 0) {
    return res.status(404).json({ message: "No platform data found" });
  }
  return res.status(200).json({
    message: "Platform data fetched successfully",
    data: platforms,
    total: platforms.length,
  });
});

export const patch_platform = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const { title, description,link } = req.body;
  
    try {
      const platformData = await Platform.findById(id);
  
      if (!platformData) {
        return res.status(404).json({ message: "Platform data not found" });
      }

      if (title && title !== platformData.title) {
        const existingTitle = await Platform.findOne({ title });
        if (existingTitle) {
          return res.status(400).json({ message: "Title already exists" });
        }
        platformData.title = title; // Update the title
      }
  
      // Update the description if provided
      if (description) {
        platformData.description = description;
      }
      if (link) {
        platformData.description = description;
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
        platformData.imageUrl = image.url;
      }
  
      // Save the updated About data
      const updatedAbout = await platformData.save();
  
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

  export const delete_platform = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the About entry by ID and delete it
      const deletedPlatform = await Platform.findByIdAndDelete(id);
  
      if (!deletedPlatform) {
        return res.status(404).json({
          success: false,
          message: "Platform data not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Platform data deleted successfully",
        data: deletedPlatform,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  });
