import { useState, useEffect } from "react";

const ProjectForm = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    longDescription: "",
    technologies: [],
    category: "",
    image: "",
    screenshots: [],
    status: "",
    finishedAt: "",
    links: {
      demo: "",
      github: "",
    },
  });

  const [availableSkills, setAvailableSkills] = useState([]);

  // Fetch available skills for the multi-select (if your API exposes /api/skills)
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/skills");
        if (res.ok) {
          const data = await res.json();
          setAvailableSkills(data);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };

    fetchSkills();
  }, []);

  // populate form when editing
  useEffect(() => {
    if (initialData) {
      const techIds = (initialData.technologies || []).map((t) =>
        typeof t === "string" ? t : t._id ? t._id : t
      );

      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        longDescription: initialData.longDescription || "",
        technologies: techIds,
        category: initialData.category || "",
        image: initialData.image || "",
        screenshots: initialData.screenshots || [],
        status: initialData.status || "",
        finishedAt: initialData.finishedAt
          ? initialData.finishedAt.split
            ? initialData.finishedAt.split("T")[0]
            : initialData.finishedAt
          : "",
        links: {
          demo: initialData.links?.demo || "",
          github: initialData.links?.github || "",
        },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      links: {
        ...form.links,
        [name]: value,
      },
    });
  };

  const handleTechChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm({ ...form, technologies: selected });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  // 🔑 Always append required fields
  formData.append("title", form.title || "");
  formData.append("description", form.description || "");
  formData.append("longDescription", form.longDescription || "");

  // other optional fields
  formData.append("category", form.category || "");
  formData.append("status", form.status || "");
  formData.append("finishedAt", form.finishedAt || "");
  formData.append("demo", form.links.demo || "");
  formData.append("github", form.links.github || "");

  // append technologies (multiple values with same key)
  if (form.technologies?.length > 0) {
    form.technologies.forEach((techId) => {
      formData.append("technologies", techId);
    });
  }

  // append image only if user selected a File
  if (form.image && form.image instanceof File) {
    formData.append("image", form.image);
  }

  // append screenshots if they are File objects
  if (form.screenshots?.length > 0) {
    form.screenshots.forEach((file) => {
      if (file instanceof File) formData.append("screenshots", file);
    });
  }

  onSave(formData);
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 pb-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Project" : "Add New Project"}
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the details below to create or update your project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Project Basics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="What is the name of the project?"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Write a short initial description of the project"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description
              </label>
              <textarea
                name="longDescription"
                placeholder="Give a longer description of your project, its goals, and key features"
                value={form.longDescription}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option value="">Select Status</option>
                <option value="ongoing">🔄 Ongoing</option>
                <option value="planned">📋 Planned</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technologies Used
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Hold Ctrl/Cmd to select multiple technologies
            </p>
            <select
              name="technologies"
              multiple
              value={form.technologies}
              onChange={handleTechChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white h-32"
            >
              {availableSkills.length === 0 ? (
                <option value="" disabled>
                  No skills found
                </option>
              ) : (
                availableSkills.map((s) => (
                  <option
                    key={s._id || s.id || s.name}
                    value={s._id || s.id || s.name}
                    className="py-1"
                  >
                    {s.name || s.title || s._id}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Media Upload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.files?.[0] || "",
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Screenshots
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setForm({
                      ...form,
                      screenshots: Array.from(e.target.files || []),
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Project Timeline & Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Completion Date
              </label>
              <input
                type="date"
                name="finishedAt"
                value={form.finishedAt}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Live Demo
              </label>
              <input
                type="url"
                name="demo"
                placeholder="https://your-demo-link.com"
                value={form.links.demo}
                onChange={handleLinkChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GitHub Repository
              </label>
              <input
                type="url"
                name="github"
                placeholder="https://github.com/username/repo"
                value={form.links.github}
                onChange={handleLinkChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {initialData ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
