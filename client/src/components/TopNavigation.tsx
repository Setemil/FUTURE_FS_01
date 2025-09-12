import { useState } from "react"
import { Search, User, Download, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleDownloadResume = () => {
    // In a real app, this would download the actual resume
    console.log("Downloading resume...")
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-background border-b border-border">
      {/* Left section - Navigation and search */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        
        {/* Navigation arrows */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-card-hover rounded-full"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm" 
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-card-hover rounded-full"
            disabled
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Right section - Profile and actions */}
      <div className="flex items-center space-x-4">
        {/* Download Resume Button */}
        <Button
          onClick={handleDownloadResume}
          className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-full px-6"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Resume
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-card-hover rounded-full"
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
                  JD
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
            <DropdownMenuItem 
              className="hover:bg-card-hover cursor-pointer"
              onClick={handleDownloadResume}
            >
              <Download className="mr-2 h-4 w-4" />
              <span>Download Resume</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}