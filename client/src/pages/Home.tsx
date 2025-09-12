import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Import project images
import ecommerceProject from "@/assets/project-ecommerce.jpg"
import fitnessProject from "@/assets/project-fitness.jpg"
import aiChatProject from "@/assets/project-ai-chat.jpg"
import taskflowProject from "@/assets/project-taskflow.jpg"

const featuredProjects = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    category: "Full-Stack",
    description: "Comprehensive e-commerce platform with admin dashboard, real-time analytics, and payment processing.",
    image: ecommerceProject,
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
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
    tech: ["React Native", "Firebase", "Redux"],
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
    tech: ["Python", "OpenAI", "Flask", "PostgreSQL"],
    githubUrl: "https://github.com/johndoe/ai-chat-assistant",
    liveUrl: "https://ai-chat-demo.herokuapp.com",
    status: "In Progress"
  },
]

const recentProjects = [
  {
    id: "4",
    title: "TaskFlow Pro",
    category: "SaaS",
    description: "Project management tool with team collaboration, time tracking, and advanced reporting.",
    image: taskflowProject,
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/johndoe/taskflow-pro",
    liveUrl: "https://taskflow-pro.com",
    status: "Completed"
  },
]

const popularSkills = [
  { name: "React", level: "Expert", projects: 15 },
  { name: "TypeScript", level: "Expert", projects: 12 },
  { name: "Node.js", level: "Advanced", projects: 10 },
  { name: "Python", level: "Advanced", projects: 8 },
  { name: "AWS", level: "Intermediate", projects: 6 },
  { name: "MongoDB", level: "Advanced", projects: 9 },
]

interface HomeProps {
  onProjectSelect: (project: any) => void
}

export default function Home({ onProjectSelect }: HomeProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Good afternoon
        </h1>
        <p className="text-muted-foreground">
          Welcome back to your portfolio
        </p>
      </div>

      {/* Made for You Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Made for John Doe
          </h2>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPlay={onProjectSelect}
            />
          ))}
        </div>
      </section>

      {/* Recently Viewed Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Recently Viewed Projects
          </h2>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPlay={onProjectSelect}
            />
          ))}
        </div>
      </section>

      {/* Popular Technologies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Popular Technologies & Skills
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-card p-4 rounded-lg hover:bg-card-hover transition-smooth cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{skill.name}</h3>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {skill.level}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Used in {skill.projects} projects
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}