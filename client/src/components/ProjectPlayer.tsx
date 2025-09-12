import { ExternalLink, Github, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectPlayerProps {
  project?: {
    id: string
    title: string
    description: string
    status: string
    githubUrl?: string
    liveUrl?: string
  } | null
}

export function ProjectPlayer({ project }: ProjectPlayerProps) {
  if (!project) {
    return (
      <footer className="h-20 bg-card border-t border-border flex items-center justify-center px-6">
        <p className="text-muted-foreground text-sm">
          Select a project to see quick actions
        </p>
      </footer>
    )
  }

  return (
    <footer className="h-20 bg-card border-t border-border flex items-center justify-between px-6">
      {/* Project Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-primary hover:text-primary-hover hover:bg-card-hover rounded-full"
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
          <div>
            <p className="text-sm font-medium text-foreground">
              {project.title}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[300px]">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Status and Quick Actions */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="text-sm font-medium text-foreground">
            {project.status}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {project.githubUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-card-hover"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-4 w-4 mr-1" />
              Code
            </Button>
          )}
          
          {project.liveUrl && (
            <Button
              variant="ghost"
              size="sm" 
              className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-card-hover"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </footer>
  )
}