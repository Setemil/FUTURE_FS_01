import { ExternalLink, Github, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectPlayerProps {
  project?: {
    id: string;
    title: string;
    description: string;
    status: string;
    links: {
      demo: string;
      github: string;
    };
  } | null;
}

export function ProjectPlayer({ project }: ProjectPlayerProps) {
  if (!project) {
    return (
      <footer className="fixed inset-x-0 bottom-0 h-16 sm:h-20 bg-card border-t border-border flex items-center justify-center px-4 sm:px-6 z-50">
        <p className="text-muted-foreground text-sm text-center">
          Select a project to see quick actions
        </p>
      </footer>
    );
  }

  return (
    <footer className="fixed inset-x-0 bottom-0 h-16 sm:h-20 bg-card border-t border-border flex items-center justify-between px-2 sm:px-4 lg:px-6 z-50">
      {/* Project Info */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-primary hover:text-primary-hover hover:bg-card-hover rounded-full flex-shrink-0"
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {project.title}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-full sm:max-w-[300px] md:max-w-[400px] hidden sm:block">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Status and Quick Actions */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {/* Status - Hidden on mobile */}
        <div className="text-right hidden md:block">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="text-sm font-medium text-foreground">
            {project.status}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {project.links.github && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-card-hover"
              onClick={() => window.open(project.links.github, "_blank")}
            >
              <Github className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Code</span>
            </Button>
          )}
          {project.links.demo && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-card-hover"
              onClick={() => window.open(project.links.demo, "_blank")}
            >
              <ExternalLink className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Live Demo</span>
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
