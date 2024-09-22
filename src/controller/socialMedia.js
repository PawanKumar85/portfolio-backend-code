import { asyncHandler } from "../utils/asyncHandler.js";
import SocialMediaLink from "../model/socialMedia.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const get_SocialMediaLinks = asyncHandler(async (req, res) => {
  const links = await SocialMediaLink.find().sort({ order: 1 });;
  res.status(200).json({
    message: "Social media links fetched successfully",
    data: links,
  });
});

export const post_SocialMediaLink = asyncHandler(async (req, res) => {
  const { platform, url } = req.body;

  if (!platform || !url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingTitle = await SocialMediaLink.findOne({ url });

  if (existingTitle) {
    return res.status(400).json({ message: "Url already exists" });
  }

  // const imageLocalPath = req.files?.imageUrl[0]?.path;
  const imageLocalPath = req.files?.icon?.[0]?.path;

  if (!imageLocalPath) {
    return res.status(400).json({ message: "icon is required" });
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    return res
      .status(500)
      .json({ message: "Error uploading image to cloudinary" });
  }

  const newSocial = new SocialMediaLink({
    platform,
    url,
    icon: image.url,
  });

  const save = await newSocial.save();

  if (!save) {
    return res.status(500).json({ message: "Error saving about data" });
  }

  return res.status(201).json({
    message: "Social data created successfully",
    data: newSocial,
  });
});
