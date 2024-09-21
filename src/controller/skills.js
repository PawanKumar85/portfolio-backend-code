import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Skill from "../model/skills.js";

export const post_skill = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingTitle = await Skill.findOne({ title });

  if (existingTitle) {
  }

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

  const newAbout = new Skill({
    title,
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

export const get_skill = async (req, res) => {
  try {
    const skills = await Skill.find({});

    if (!skills || skills.length === 0) {
      return res.status(404).json({
        message: "No Skill data found",
      });
    }

    return res.status(200).json({
      message: "Skill data fetched successfully",
      data: skills,
      total: skills.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const patch_skill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const skill = await Skill.findById({ _id: id });
  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  // Update title if provided
  if (title) {
    const existingTitle = await Skill.findOne({ title });
    if (existingTitle) {
    }
    skill.title = title;
  }

  // Handle image upload if provided
  const imageLocalPath = req.files?.imageUrl?.[0]?.path;
  if (imageLocalPath) {
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      return res
        .status(500)
        .json({ message: "Error uploading image to Cloudinary" });
    }
    skill.imageUrl = image.url;
  }

  // Save the updated skill
  const updatedSkill = await skill.save();
  if (!updatedSkill) {
    return res.status(500).json({ message: "Error updating skill data" });
  }

  return res.status(200).json({
    message: "Skill data updated successfully",
    data: updatedSkill,
  });
});

export const delete_skill = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const skill = await Skill.findById({_id : id}); 
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
  
    // Delete the skill
    await Skill.findByIdAndDelete(id); // Use `id` here
  
    return res.status(200).json({
      message: "Skill deleted successfully",
    });
  });
