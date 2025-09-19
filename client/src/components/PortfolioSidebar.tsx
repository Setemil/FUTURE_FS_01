/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Home,
  User,
  FolderOpen,
  Mail,
  Play,
  ExternalLink,
  Github,
} from "lucide-react";
import {useState, useEffect} from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const navigationItems = [
  { title: "Profile", url: "/", icon: User },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Contact", url: "/contact", icon: Mail },
];

interface ProjectsProps {
  onProjectSelect: (project: any) => void;
}


export function PortfolioSidebar({ onProjectSelect }: ProjectsProps) {
  const API = import.meta.env.VITE_API_URL;

  const [data, setData] = useState([]);
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const navigate = useNavigate();

    const playButton = (project) => {
      onProjectSelect(project);
      navigate(`/projects/${project._id}`);
    };

  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetch(`${API}/api/projects`);
        const projects = await res.json();
        setData(projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    getProjects();
  }, []);

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
                        <span
                          className={`${
                            location.pathname == item.url
                              ? "text-spotify-green"
                              : "text-spotify-white"
                          } text-sm font-medium`}
                        >
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
                {data.map((project) => (
                  <div
                    key={project._id}
                    className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-card-hover cursor-pointer transition-smooth"
                  >
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover shadow-spotify"
                      />
                      <div className="absolute inset-0 bg-spotify-black/20 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
                        <button onClick={() => playButton(project)}>
                          <Play className="h-4 w-4 text-primary fill-primary" />
                        </button>
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
