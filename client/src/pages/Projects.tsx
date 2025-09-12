import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Grid, List } from "lucide-react"

// Import project images
import ecommerceProject from "@/assets/project-ecommerce.jpg"
import fitnessProject from "@/assets/project-fitness.jpg"
import aiChatProject from "@/assets/project-ai-chat.jpg"
import taskflowProject from "@/assets/project-taskflow.jpg"

const allProjects = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    category: "Full-Stack",
    description: "Comprehensive e-commerce platform with admin dashboard, real-time analytics, and payment processing.",
    image: ecommerceProject,
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    githubUrl: "https://github.com/johndoe/ecommerce-dashboard",
    liveUrl: "https://ecommerce-demo.vercel.app",
    status: "Completed"
  },
  {
    id: "2", 
    title: "FitTracker Mobile",
    category: "Mobile App",
    description: "Cross-platform fitness tracking app with workout planning, progress tracking, and social features.",
    image: fitnessProject,
    tech: ["React Native", "Firebase", "Redux", "AsyncStorage"],
    githubUrl: "https://github.com/johndoe/fittracker-mobile",
    liveUrl: "https://play.google.com/store/apps/fittracker",
    status: "Completed"
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    category: "AI/ML",
    description: "Intelligent chat assistant powered by OpenAI GPT-4 with custom training and conversation memory.",
    image: aiChatProject,
    tech: ["Python", "OpenAI", "Flask", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/johndoe/ai-chat-assistant",
    liveUrl: "https://ai-chat-demo.herokuapp.com",
    status: "In Progress"
  },
  {
    id: "4",
    title: "TaskFlow Pro",
    category: "SaaS",
    description: "Project management tool with team collaboration, time tracking, and advanced reporting.",
    image: taskflowProject,
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind", "NextAuth"],
    githubUrl: "https://github.com/johndoe/taskflow-pro",
    liveUrl: "https://taskflow-pro.com",
    status: "Completed"
  },
]

const categories = ["All", "Full-Stack", "Mobile App", "AI/ML", "SaaS"]

interface ProjectsProps {
  onProjectSelect: (project: any) => void
}

export default function Projects({ onProjectSelect }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjects = selectedCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
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
            key={project.id}
            project={project}
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
            variant="ghost"
            onClick={() => setSelectedCategory("All")}
            className="mt-4"
          >
            Show all projects
          </Button>
        </div>
      )}
    </div>
  )
}