import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Project from "../model/project.js";

// POST: Create a new project
export const post_project = asyncHandler(async (req, res) => {
  const { title, skills, link } = req.body;

  // Validate input fields
  if (!title || !skills || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for existing title
  const existingTitle = await Project.findOne({ title });
  if (existingTitle) {
    return res.status(400).json({ message: "Title already exists" });
  }

  const imageLocalPath = req.files?.imageUrl?.[0]?.path;
  if (!imageLocalPath) {
    return res.status(400).json({ message: "Image is required" });
  }

  // Upload image to Cloudinary
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    return res.status(500).json({ message: "Error uploading image to Cloudinary" });
  }

  // Create new project
  const newProject = new Project({
    title,
    skills,
    link,
    imageUrl: image.url, // Adjusted to match your model
  });

  // Save the new project
  const savedProject = await newProject.save();
  if (!savedProject) {
    return res.status(500).json({ message: "Error saving project data" });
  }

  return res.status(201).json({
    message: "Project added successfully",
    data: savedProject,
  });
});

// GET: Retrieve all projects
export const get_project = async (req, res) => {
  try {
    const projectData = await Project.find({});
    if (!projectData || projectData.length === 0) {
      return res.status(404).json({ message: "No project data found" });
    }

    return res.status(200).json({
      message: "Project data fetched successfully",
      data: projectData,
      total: projectData.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PATCH: Update a project by ID
export const patch_project = asyncHandler(async (req, res) => {
  const { id } = req.params; // The ID of the project to be updated
  const { title, skills, link } = req.body;

  try {
    // Find the existing project by ID
    const projectData = await Project.findById(id);
    if (!projectData) {
      return res.status(404).json({ message: "Project data not found" });
    }

    // Check for a new title and ensure it's unique
    if (title && title !== projectData.title) {
      const existingTitle = await Project.findOne({ title });
      if (existingTitle) {
        return res.status(400).json({ message: "Title already exists" });
      }
      projectData.title = title; // Update the title
    }

    if (skills) {
      projectData.skills = skills; // Update skills
    }
    if (link) {
      projectData.link = link; // Update link
    }

    // Handle image upload if a new image is provided
    if (req.files?.imageUrl?.[0]?.path) {
      const imageLocalPath = req.files.imageUrl[0].path;
      const image = await uploadOnCloudinary(imageLocalPath);
      if (!image) {
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }
      projectData.imageUrl = image.url; // Update the image URL
    }

    // Save the updated project data
    const updatedProject = await projectData.save();
    return res.status(200).json({
      message: "Project data updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export const delete_project = asyncHandler(async (req, res) => {
    const { id } = req.params; // The ID of the about data to delete
  
    try {
      // Find the About entry by ID and delete it
      const deletedProject = await Project.findByIdAndDelete(id);
  
      if (!deletedProject) {
        return res.status(404).json({
          success: false,
          message: "Project data not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Project data deleted successfully",
        data: deletedProject, // Optionally return the deleted data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  });
