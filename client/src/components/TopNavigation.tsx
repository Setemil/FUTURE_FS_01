import { useState } from "react";
import {
  Search,
  User,
  Download,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isProjectDetails = /^\/projects\/[^/]+$/.test(location.pathname);
  const secretMovement = () => {
    navigate("/admin");
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery("");
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-2 sm:px-4 bg-background border-b border-border">
      {/* Mobile search overlay */}
      {isSearchVisible && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-start pt-16 px-4 sm:hidden">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 bg-card border-border focus:ring-primary focus:border-primary"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={toggleSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Left section - Navigation and search */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

        {/* Navigation arrows */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-card-hover rounded-full"
            disabled={!isProjectDetails}
            onClick={() => {
              if (isProjectDetails) navigate("/projects");
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop search bar */}
        <div className="relative w-80 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Mobile search trigger */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-card-hover rounded-full md:hidden"
          onClick={toggleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Right section - Profile and actions */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Download Resume Button - Hidden on small screens, shown on medium+ */}
        <Button className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-full px-3 sm:px-6 hidden sm:flex">
          <a
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden lg:inline">View My Resume</span>
            <span className="lg:hidden hidden sm:inline">Resume</span>
          </a>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-card-hover rounded-full"
          onClick={secretMovement}
        >
          <Bell className="h-4 w-4" />
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 hover:bg-card-hover"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                  SL
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-popover border-border shadow-spotify"
            align="end"
            forceMount
          >
            <DropdownMenuItem className="hover:bg-card-hover cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-card-hover cursor-pointer">
              <Download className="mr-2 h-4 w-4" />
              <span>Skills</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="hover:bg-card-hover cursor-pointer">
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Resume</span>
              </a>
            </DropdownMenuItem>
            {/* Mobile-only resume option */}
            <DropdownMenuItem className="hover:bg-card-hover cursor-pointer sm:hidden">
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                <span>View My Resume</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
