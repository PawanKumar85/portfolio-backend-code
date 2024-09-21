import Education from "../model/education.js";

export const post_education = async (req, res) => {
  try {
    const { title, course, courseID, college, duration } = req.body;

    if (!title || !course || !courseID || !college || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEducation = await Education.findOne({ title });
    if (existingEducation) {
      return res.status(400).json({ message: "Title already exists" });
    }

    const newEducation = new Education({
      title,
      course,
      courseID,
      college,
      duration,
    });
    await newEducation.save();

    return res.status(201).json({
      message: "Education data created successfully",
      data: newEducation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
};

export const get_education = async (req, res) => {
  try {
    const education = await Education.find({});
    if (!education || education.length === 0) {
      return res.status(404).json({ message: "No education data found" });
    }
    return res.status(200).json({
      message: "Education data fetched successfully",
      data: education,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message, status: 500 });
  }
};

export const patch_education = async (req, res) => {
  const { id } = req.params; // Assuming the ID is passed as a route parameter
  const updates = req.body; // The data to update

  try {
    // Find the education entry by ID and update it
    const updatedEducation = await Education.findByIdAndUpdate(id, updates, {
      new: true,
    });

    // Check if the education entry was found
    if (!updatedEducation) {
      return res.status(404).json({ message: "Education entry not found" });
    }

    return res.status(200).json({
      message: "Education entry updated successfully",
      data: updatedEducation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const delete_education = async (req, res) => {
  const { id } = req.params; 

  try {
    // Find the education entry by ID and remove it
    const deletedEducation = await Education.findByIdAndDelete({_id:id});

    // Check if the education entry was found and deleted
    if (!deletedEducation) {
      return res.status(404).json({ message: "Education entry not found" });
    }

    return res.status(200).json({
      message: "Education entry deleted successfully",
      data: deletedEducation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
