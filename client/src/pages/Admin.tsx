/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit2,
  Trash2,
  Plus,
  ExternalLink,
  Github,
  Eye,
  Calendar,
  User,
  Code,
  Database,
  GitFork,
  CodeXml,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/Card";

//Form Imports and Components
import SkillForm from "@/components/SkillsForm";
import ProjectForm from "@/components/ProjectForm";
import ExperienceForm from "@/components/ExperienceForm";
import DeleteModal from "@/components/DeleteModal";

const Admin = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // PROJECTS STATES
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  //SKILLS STATES
  const [skills, setSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  // EXPERIENCE STATES
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experience, setExperience] = useState([]);

  const [deletingItem, setDeletingItem] = useState<{
    type: string;
    item: any;
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${API}/api/projects`);
        if (!response.ok) {
          throw new Error("Failed to get projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch(`${API}/api/skills`);
        if (!response.ok) {
          throw new Error("Failed to get skills");
        }
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchSkills();
  }, []);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const response = await fetch(`${API}/api/experience`);
        if (!response.ok) {
          throw new Error("Failed to get experience");
        }
        const data = await response.json();
        setExperience(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchExperience();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "frontend":
        return <Code className="w-4 h-4" />;
      case "backend":
        return <CodeXml className="w-4 h-4" />;
      case "fullstack":
        return <User className="w-4 h-4" />;
      case "tools":
        return <GitFork className="w-4 h-4" />;
      case "database":
        return <Database className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case "advanced":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "beginner":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDatePeriod = (startDate, endDate, isCurrent) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };
    const start = formatDate(startDate);
    const end = isCurrent ? "Present" : formatDate(endDate);
    return `${start} - ${end}`;
  };

  const deleteItem = async () => {
    console.log(`About to delete a ${deletingItem.type}`);
    console.log(deletingItem.item);
    try {
      const res = await fetch(
        `${API}/api/${deletingItem.type}/${deletingItem.item._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to Delete");
      }
      if (deletingItem.type === "projects") {
        setProjects((prev) =>
          prev.filter((p) => p._id !== deletingItem.item._id)
        );
      } else if (deletingItem.type === "skills") {
        setSkills((prev) =>
          prev.filter((s) => s._id !== deletingItem.item._id)
        );
      } else if (deletingItem.type === "experience") {
        setExperience((prev) =>
          prev.filter((e) => e._id !== deletingItem.item._id)
        );
      }
    } catch (error) {
      console.log("Error Deleting: ", error);
    }
    setDeletingItem(null);
    setShowDeleteModal(false);
  };

  // Experience Card Component

  const ExperienceCard = ({ experience }) => {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-foreground">
                {experience.role}
              </CardTitle>
              <CardDescription className="text-primary font-medium">
                {experience.location}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-secondary/50 text-secondary-foreground"
              >
                {formatDatePeriod(
                  experience.startDate,
                  experience.endDate,
                  experience.isCurrent
                )}
              </Badge>
              <div className="flex gap-2 ml-2">
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => {
                    setEditingExperience(experience);
                    setShowExperienceModal(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={() => {
                    setDeletingItem({ type: "experience", item: experience });
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        {experience.workDescription && (
          <CardContent>
            <p className="text-muted-foreground">
              {experience.workDescription}
            </p>
          </CardContent>
        )}
      </Card>
    );
  };

  //  Project Card Component
  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {getCategoryIcon(project.category)}
            <span className="text-sm font-medium text-gray-600 capitalize">
              {project.category}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => {
              setShowProjectModal(true);
              setEditingProject(project);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={() => {
              setDeletingItem({ type: "projects", item: project });
              setShowDeleteModal(true);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {project.image && (
        <div className="mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-32 object-cover rounded-lg bg-gray-100"
          />
        </div>
      )}

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {typeof tech === "object" ? tech.name : tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
            >
              <Github className="w-3 h-3" />
              Code
            </a>
          )}
        </div>
        {project.finishedAt && (
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar className="w-3 h-3" />
            {new Date(project.finishedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );

  // Skill Card Component

  const SkillCard = ({ skill }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow w-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {skill.icon && (
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {skill.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {getCategoryIcon(skill.category)}
            <span className="text-sm font-medium text-gray-600 capitalize">
              {skill.category}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(
                skill.proficiency
              )}`}
            >
              {skill.proficiency}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => {
              setEditingSkill(skill);
              setShowSkillModal(true);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={() => {
              setDeletingItem({ type: "skills", item: skill });
              setShowDeleteModal(true);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{skill.description}</p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          {skill.yearsOfExperience > 0 && (
            <span>
              {skill.yearsOfExperience} year
              {skill.yearsOfExperience !== 1 ? "s" : ""} experience
            </span>
          )}
        </div>
        {skill.relationships && skill.relationships.length > 0 && (
          <div className="text-sm text-gray-500">
            {skill.relationships.length} project
            {skill.relationships.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Portfolio Admin Dashboard
            </h1>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <p className="text-gray-600">Manage your projects and skills</p>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Projects ({projects.length})
            </h2>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                setEditingProject(null);
                setShowProjectModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">
                No projects found. Add your first project to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="space-y-4 pb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Skills ({skills.length})
            </h2>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => {
                setEditingSkill(null);
                setShowSkillModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          {skills.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">
                No skills found. Add your first skill to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {skills.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div className="space-y-4 pb-16">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Experience ({experience.length})
            </h2>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => {
                setEditingExperience(null);
                setShowExperienceModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          {experience.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">
                No Experience found. Add your first xp to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              {experience.map((xp) => (
                <ExperienceCard key={xp._id} experience={xp} />
              ))}
            </div>
          )}
        </div>
      </div>
      // Project Modal
      {showProjectModal && (
        <ProjectForm
          initialData={editingProject}
          onSave={(data) => {
            if (editingProject) {
              fetch(
                `${API}/api/projects/${editingProject._id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: data,
                }
              ).then((res) => {
                if (res.ok) {
                  res.json().then((updatedProject) => {
                    setProjects((prev) =>
                      prev.map((project) =>
                        project._id === updatedProject._id
                          ? updatedProject
                          : project
                      )
                    );
                    setShowProjectModal(false);
                    setEditingProject(null);
                  });
                } else {
                  console.error("Failed to update Project");
                }
              });
            } else {
              fetch(`${API}/api/projects`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: data,
              }).then((res) => {
                if (res.ok) {
                  res.json().then((newProject) => {
                    setProjects((prev) => [...prev, newProject]);
                    setShowProjectModal(false);
                  });
                } else {
                  console.error("Failed to add Project");
                }
              });
            }
          }}
          onClose={() => setShowProjectModal(false)}
        />
      )}
      // Skill Modal
      {showSkillModal && (
        <SkillForm
          initialData={editingSkill}
          onSave={(data) => {
            if (editingSkill) {
              fetch(`${API}/api/skills/${editingSkill._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              }).then((res) => {
                if (res.ok) {
                  res.json().then((updatedSkill) => {
                    setSkills((prev) =>
                      prev.map((skill) =>
                        skill._id === updatedSkill._id ? updatedSkill : skill
                      )
                    );
                    setShowSkillModal(false);
                    setEditingSkill(null);
                  });
                } else {
                  console.error("Failed to update skill");
                }
              });
            } else {
              fetch(`${API}/api/skills`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              }).then((res) => {
                if (res.ok) {
                  res.json().then((newSkill) => {
                    setSkills((prev) => [...prev, newSkill]);
                    setShowSkillModal(false);
                  });
                } else {
                  console.error("Failed to add skill");
                }
              });
            }
          }}
          onClose={() => setShowSkillModal(false)}
        />
      )}
      // Experience Modal
      {showExperienceModal && (
        <ExperienceForm
          initialData={editingExperience}
          onSave={(data) => {
            if (editingExperience) {
              fetch(
                `${API}/api/experience/${editingExperience._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(data),
                }
              ).then((res) => {
                if (res.ok) {
                  res.json().then((updatedExperience) => {
                    setExperience((prev) =>
                      prev.map((skill) =>
                        skill._id === updatedExperience._id
                          ? updatedExperience
                          : experience
                      )
                    );
                    setShowExperienceModal(false);
                    setEditingExperience(null);
                  });
                } else {
                  console.error("Failed to update experience");
                }
              });
            } else {
              fetch(`${API}/api/experience`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              }).then((res) => {
                if (res.ok) {
                  res.json().then((newExperience) => {
                    setExperience((prev) => [...prev, newExperience]);
                    setShowExperienceModal(false);
                  });
                } else {
                  console.error("Failed to add Experience");
                }
              });
            }
          }}
          onClose={() => setShowExperienceModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          opened={showDeleteModal}
          close={() => setShowDeleteModal(false)}
          deletingItem={deletingItem}
          deleteFunc={deleteItem}
        />
      )}
    </div>
  );
};

export default Admin;
