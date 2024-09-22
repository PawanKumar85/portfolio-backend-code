import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    link: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Platform = mongoose.model('Platform', platformSchema);

export default Platform;
