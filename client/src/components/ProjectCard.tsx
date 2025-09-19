/* eslint-disable @typescript-eslint/no-explicit-any */
import { Play, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    githubUrl?: string;
    liveUrl?: string;
    status: string;
  };
  onPlay: (project: any) => void;
}

export function ProjectCard({ project, onPlay }: ProjectCardProps) {
  const navigate = useNavigate();
  const playButton = () => {
    onPlay(project);
    navigate(`/projects/${project._id}`);
  };
  return (
    <div className="group bg-card rounded-lg p-4 hover:bg-card-hover transition-smooth cursor-pointer shadow-spotify hover:shadow-green-glow/20">
      {/* Project Image */}
      <div className="relative mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-spotify-black/40 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
          <Button
            onClick={playButton}
            className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full h-14 w-14 shadow-green-glow transform scale-95 group-hover:scale-100 transition-bounce"
          >
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-smooth">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">{project.category}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs bg-secondary/50 text-secondary-foreground hover:bg-secondary/70"
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs bg-secondary/50 text-secondary-foreground"
            >
              +{project.tech.length - 3}
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            {project.status}
          </span>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, "_blank");
                }}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.liveUrl, "_blank");
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
