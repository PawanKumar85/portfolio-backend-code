// models/socialMediaLink.js
import mongoose from "mongoose";
const socialMediaLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['LinkedIn', 'GitHub', 'Email', 'Facebook', 'Instagram', 'Twitter'],
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const SocialMediaLink = mongoose.model('SocialMediaLink', socialMediaLinkSchema);
export default SocialMediaLink;