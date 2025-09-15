import Experience from "../model/experience.model.js";

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error getting Experiences" });
  }
};
export const createExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json(newExperience);
    console.log("Experience added successfully");
  } catch (error) {
    res.status(500).json({ message: "Error adding experience" });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: "Error Updating Experience" });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Skill" });
  }
};
