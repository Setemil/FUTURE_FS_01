import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["frontend", "backend", "fullstack", "tools"],
    default: "other",
  },
  proficiency: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  yearsOfExperience: { type: Number, min: 0, default: 0 },
    relationships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  icon: String,
});

export default mongoose.model("Skill", skillSchema);
