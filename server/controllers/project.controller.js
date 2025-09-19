import Project from "../model/project.model.js";
import dotenv from "dotenv";

dotenv.config();

const serverURL = process.env.SERVER_URL;

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("technologies").exec();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Update text fields
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.longDescription =
      req.body.longDescription || project.longDescription;
    project.category = req.body.category || project.category;
    project.status = req.body.status || project.status;
    project.finishedAt = req.body.finishedAt || project.finishedAt;
    project.links.demo = req.body.demo || project.links.demo;
    project.links.github = req.body.github || project.links.github;

    // ✅ Update image if a new one was uploaded
    if (req.files?.image) {
      project.image = req.files.image[0].path; // Cloudinary URL
    }

    // ✅ Update screenshots if new ones were uploaded
    if (req.files?.screenshots) {
      project.screenshots = req.files.screenshots.map((f) => f.path);
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting project" });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      longDescription,
      category,
      status,
      finishedAt,
      demo,
      github,
    } = req.body;

    let technologies = [];
    if (req.body.technologies) {
      technologies = Array.isArray(req.body.technologies)
        ? req.body.technologies
        : [req.body.technologies];
    }

    const project = new Project({
      title,
      description,
      longDescription,
      category,
      status,
      finishedAt: finishedAt ? new Date(finishedAt) : undefined,
      links: { demo, github },
      technologies,
      image: req.files?.image ? req.files.image[0].path : "",
      screenshots: req.files?.screenshots
        ? req.files.screenshots.map((f) => f.path)
        : [],
    });

    await project.save();
    res.status(201).json(project);
    console.log("Uploaded files:", req.files);
    console.log("Cloudinary connected:", process.env.CLOUDINARY_CLOUD_NAME);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: err.message });
  }
};
