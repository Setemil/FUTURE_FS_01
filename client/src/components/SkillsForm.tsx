import { useState, useEffect } from "react";

const SkillsForm = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    proficiency: "beginner",
    yearsOfExperience: 0,
    description: "",
    icon: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: name === "yearsOfExperience" ? Number(value) : value,
        });
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        onSave(form)
        onClose()
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Skill" : "Add Skill"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="tools">Tools</option>
            <option value="database">Database</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            name="yearsOfExperience"
            placeholder="Years Of Experience"
            value={form.yearsOfExperience}
            onChange={handleChange}
            min="0"
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="icon"
            placeholder="Input the icon url"
            value={form.icon}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <select
            name="proficiency"
            value={form.proficiency}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;
