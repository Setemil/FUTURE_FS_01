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
    <div className="group bg-card rounded-lg p-3 sm:p-4 hover:bg-card-hover transition-smooth cursor-pointer shadow-spotify hover:shadow-green-glow/20 h-full flex flex-col">
      {/* Project Image */}
      <div className="relative mb-3 sm:mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-spotify-black/40 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
          <Button
            onClick={playButton}
            className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-green-glow transform scale-95 group-hover:scale-100 transition-bounce"
          >
            <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col">
        <div>
          <h3 className="font-semibold text-foreground text-base sm:text-lg group-hover:text-primary transition-smooth line-clamp-1 sm:line-clamp-none">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {project.category}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {project.tech
            .slice(0, window.innerWidth < 640 ? 2 : 3)
            .map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 truncate max-w-20 sm:max-w-none"
              >
                {tech}
              </Badge>
            ))}
          {project.tech.length > (window.innerWidth < 640 ? 2 : 3) && (
            <Badge
              variant="secondary"
              className="text-xs bg-secondary/50 text-secondary-foreground"
            >
              +{project.tech.length - (window.innerWidth < 640 ? 2 : 3)}
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-1 sm:pt-2 mt-auto">
          <span className="text-xs text-muted-foreground truncate flex-1 mr-2">
            {project.status}
          </span>
          <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-smooth">
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-muted-foreground hover:text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, "_blank");
                }}
              >
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-muted-foreground hover:text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.liveUrl, "_blank");
                }}
              >
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
