import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  workDescription: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  isCurrent: { type: Boolean, default: false },
});

export default mongoose.model("Experience", experienceSchema)