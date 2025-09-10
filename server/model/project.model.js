import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    longDescription: String,
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    category: {
      type: String,
      enum: ["frontend", "backend", "fullstack"],
      default: "frontend",
    },
    image: String,
    demoLink: String,
    github: String,
    status: {
      type: String,
      enum: ["ongoing", "completed", "planned"],
      default: "planned",
    },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    finishedAt: Date,
  }
);

export default mongoose.model("Project", projectSchema, "projects");