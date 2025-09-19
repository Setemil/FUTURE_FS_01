/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";

const categories = ["All", "Frontend", "Backend", "Fullstack"];
interface ProjectsProps {
  onProjectSelect: (project: any) => void;
}

export default function Projects({ onProjectSelect }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:3000/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => {
          const categoryCapitalized =
            project.category.charAt(0).toUpperCase() +
            project.category.slice(1);
          return categoryCapitalized === selectedCategory;
        });

  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-9 w-9 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-9 w-9 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project._id}
            project={{
              ...project,
              category:
                project.category.charAt(0).toUpperCase() +
                project.category.slice(1),
              tech: project.technologies.map((skill: any) => skill.name),
              liveUrl: project.links.demo,
              githubUrl: project.links.github,
              status:
                project.status.charAt(0).toUpperCase() +
                project.status.slice(1),
              image: project.image,
            }}
            onPlay={onProjectSelect}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No projects found in this category
          </p>
          <Button
            variant="secondary"
            onClick={() => setSelectedCategory("All")}
            className="mt-4"
          >
            Show all projects
          </Button>
        </div>
      )}
    </div>
  );
}
