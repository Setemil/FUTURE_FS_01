/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Mail, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const API = import.meta.env.VITE_API_URL;
  const formatDatePeriod = (startDate, endDate, isCurrent) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };

    const start = formatDate(startDate);
    const end = isCurrent ? "Present" : formatDate(endDate);

    return `${start} - ${end}`;
  };
  const [data, setData] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/skills`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  useEffect(() => {
    fetch(`${API}/api/experience`)
      .then((response) => response.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error("Error fetching Experience: ", error));
  }, []);

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  console.log(experience);
  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <Avatar className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-52 lg:w-52 rounded-lg flex-shrink-0">
          <AvatarImage
            src="/pic.png"
            alt="Setemi Loye"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl sm:text-3xl md:text-4xl font-bold">
            SL
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4 text-center sm:text-left w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Setemi Loye</h1>
            <p className="text-lg sm:text-xl text-primary font-medium mt-1">
              Full-Stack Developer
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl mx-auto sm:mx-0">
              Passionate full-stack developer with 5+ years of experience
              building scalable web applications. I love creating efficient,
              user-friendly solutions that solve real-world problems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Lagos, NG</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Available for projects</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Setemi_Loye_Resume.pdf"
              className="w-full sm:w-auto"
            >
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </a>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" className="border-border w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills & Technologies */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {Object.entries(groupedSkills).map(([category, skillList]) => (
            <Card key={category} className="bg-card border-border">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="capitalize text-foreground text-lg sm:text-xl">
                  {category}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  {category == "tools"
                    ? `Tools I use for Development`
                    : `Technologies I work with in ${category.toLowerCase()} development`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {skillList.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-4 w-4 sm:h-5 sm:w-5"
                          />
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.proficiency.charAt(0).toUpperCase() +
                            skill.proficiency.slice(1)}{" "}
                          • {skill.yearsOfExperience} yrs
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="pb-20 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Experience</h2>

        <div className="space-y-4 sm:space-y-6">
          {[...experience]
            .sort(
              (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
            )
            .map((xp, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                    <div>
                      <CardTitle className="text-foreground text-lg sm:text-xl">
                        {xp.role}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium text-sm sm:text-base">
                        {xp.location}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-secondary/50 text-secondary-foreground text-xs sm:text-sm self-start"
                    >
                      {formatDatePeriod(xp.startDate, xp.endDate, xp.isCurrent)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">{xp.workDescription}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
    </div>
  );
}