import { useState, useEffect } from "react";

const ExperienceForm = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState({
    role: "",
    location: "",
    workDescription: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        startDate: initialData.startDate
          ? initialData.startDate.split("T")[0]
          : "",
        endDate: initialData.endDate ? initialData.endDate.split("T")[0] : "",
      });
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Experience" : "Add Experience"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="role"
            placeholder="What was the role in the place?"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Where did you work?"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <textarea
            name="workDescription"
            placeholder="Describe your work"
            value={form.workDescription}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={4}
          />
          <input
            type="date"
            name="startDate"
            placeholder="When did you start?"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            name="endDate"
            placeholder="When did you end?"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            disabled={form.isCurrent}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isCurrent"
              checked={form.isCurrent}
              onChange={(e) =>
                setForm({ ...form, isCurrent: e.target.checked })
              }
              className="mr-2"
            />
            I currently work here
          </label>

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

export default ExperienceForm;
