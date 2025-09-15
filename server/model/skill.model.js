import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ["frontend", "backend", "fullstack", "tools", "database"],
    default: "other",
    required: true,
  },
  description: { type: String, required: true },
  proficiency: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  yearsOfExperience: { type: Number, min: 0, default: 0 },
  relationships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  icon: { type: String, required: true },
});

export default mongoose.model("Skill", skillSchema);
