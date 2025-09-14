import {
  Home,
  User,
  FolderOpen,
  Mail,
  Play,
  ExternalLink,
  Github,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Import project images
import ecommerceProject from "@/assets/project-ecommerce.jpg";
import fitnessProject from "@/assets/project-fitness.jpg";
import aiChatProject from "@/assets/project-ai-chat.jpg";
import taskflowProject from "@/assets/project-taskflow.jpg";
import { it } from "node:test";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Contact", url: "/contact", icon: Mail },
];

const featuredProjects = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    category: "Full-Stack",
    image: ecommerceProject,
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "2",
    title: "FitTracker Mobile",
    category: "Mobile App",
    image: fitnessProject,
    tech: ["React Native", "Firebase"],
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    category: "AI/ML",
    image: aiChatProject,
    tech: ["Python", "OpenAI", "Flask"],
  },
  {
    id: "4",
    title: "TaskFlow Pro",
    category: "SaaS",
    image: taskflowProject,
    tech: ["Next.js", "Prisma", "PostgreSQL"],
  },
];

export function PortfolioSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    `${
      isActive
        ? "bg-primary text-primary-foreground font-medium"
        : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
    } transition-smooth`;

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-border">
        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-4 py-2">
            Your Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon
                        className={`${
                          location.pathname == item.url
                            ? "text-spotify-green"
                            : "text-spotify-white"
                        } h-5 w-5`}
                      />
                      {!isCollapsed && (
                        <span className={`${location.pathname == item.url ? 'text-spotify-green':'text-spotify-white'} text-sm font-medium`}>
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Featured Projects Section */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-4 py-2 mt-4">
              Featured Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-card-hover cursor-pointer transition-smooth"
                  >
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover shadow-spotify"
                      />
                      <div className="absolute inset-0 bg-spotify-black/20 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
                        <Play className="h-4 w-4 text-primary fill-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {project.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {project.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
