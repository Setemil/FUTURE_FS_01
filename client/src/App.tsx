/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import {MantineProvider} from '@mantine/core';

import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { TopNavigation } from "@/components/TopNavigation";
import { ProjectPlayer } from "@/components/ProjectPlayer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import RequestOTP from "./pages/RequestOTP";
import VerifyOTP from "./pages/VerifyOTP";
import Admin from "./pages/Admin";
import ProjectForm from "./pages/ProjectForm";

const queryClient = new QueryClient();

const App = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="flex min-h-screen w-full bg-background">
                <PortfolioSidebar />

                <div className="flex-1 flex flex-col">
                  <TopNavigation />

                  <main className="flex-1 overflow-auto">
                    <Routes>
                      {/* Public Portfolio Routes */}
                      <Route
                        path="/"
                        element={<Home onProjectSelect={setSelectedProject} />}
                      />
                      <Route
                        path="/projects"
                        element={
                          <Projects onProjectSelect={setSelectedProject} />
                        }
                      />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* Protected Admin Routes */}
                      <Route path="/admin" element={<RequestOTP />} />
                      <Route path="/admin/verify" element={<VerifyOTP />} />
                      <Route path="/admin/dashboard" element={<Admin />} />
                      <Route path="/admin/projects/new" element={<ProjectForm mode="add"/>} />
                      <Route path="/admin/projects/edit/:id" element={<ProjectForm mode="edit"/>} />

                      {/* Not Found Page */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>

                  <ProjectPlayer project={selectedProject} />
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
