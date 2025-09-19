/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";

export default function ProjectDetails() {
  const API = import.meta.env.VITE_API_URL;
  

  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-green-500" />
          <p className="text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 text-lg">Project not found</p>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-black pb-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-400/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Project Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-gray-900 text-white font-semibold rounded-full transition-all duration-300 border border-gray-600 hover:border-green-500"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-2xl"></div>
              <img
                src={project.image}
                alt={project.title}
                className="relative w-full rounded-2xl shadow-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Details */}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                Project Details
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-5 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech: any) => (
                  <span
                    key={tech.id}
                    className="inline-flex items-center px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 text-sm font-medium rounded-full border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:text-green-400"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats or Additional Info */}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-5 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                Quick Info
              </h3>
              <div className="space-y-4">
                {project.category && (
                  <div className="group">
                    <span className="text-gray-400 text-sm uppercase tracking-wide font-semibold">
                      Category
                    </span>
                    <p className="text-gray-200 font-medium group-hover:text-green-400 transition-colors duration-300">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </p>
                  </div>
                )}
                {project.date && (
                  <div className="group">
                    <span className="text-gray-400 text-sm uppercase tracking-wide font-semibold">
                      Date
                    </span>
                    <p className="text-gray-200 font-medium group-hover:text-green-400 transition-colors duration-300">
                      {project.date}
                    </p>
                  </div>
                )}
                {project.status && (
                  <div className="group">
                    <span className="text-gray-400 text-sm uppercase tracking-wide font-semibold">
                      Status
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-gray-200 font-medium group-hover:text-green-400 transition-colors duration-300">
                        {project.status}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
