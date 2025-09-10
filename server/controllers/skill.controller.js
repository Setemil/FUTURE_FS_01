import Skills from '../model/skill.model.js';

//This is to disiplay all the skills
export const getSkills = async (req, res) => {
    try {
        const skills = await Skills.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: "Error getting Skills: ", error });
    }
};

//This is to add a new skill
export const createSkill = async (req, res) => {
    try {
        const newSkill = new Skills(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
        console.log("Skill added successfully")
    } catch (error) {
        res.status(500).json({ message: "Error adding skill:", error });
    }
}

//This is to update a skill
export const updateSkill = async (req, res) => {
    try {
        const updatedSkill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSkill);
    } catch (error) {
        res.status(500).json({ message: "Error updating skill:", error });
    }
}

//This is to delete a skill
export const deleteSkill = async (req, res) => {
    try {
        await Skills.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Error deleting skill:", error });
    }
}