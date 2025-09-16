import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  longDescription: {type: String, required: true},
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  category: {
    type: String,
    enum: ["frontend", "backend", "fullstack"],
    default: "frontend",
  },
    image: String,
  screenshots: [String],
  links: {
    demo: String,
    github: String,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "planned"],
    default: "planned",
  },
  finishedAt: Date,
});

export default mongoose.model("Project", projectSchema, "projects");
