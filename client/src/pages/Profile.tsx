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

const experience = [
  {
    title: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description:
      "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
  },
  {
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description:
      "Built and maintained multiple web applications, improved performance by 40%, and mentored junior developers.",
  },
  {
    title: "Frontend Developer",
    company: "WebAgency",
    period: "2018 - 2020",
    description:
      "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
  },
];

export default function Profile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/skills")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-start space-x-6">
        <Avatar className="h-58 w-52 rounded-lg">
          <AvatarImage
            src="/pic.png"
            alt="Setemi Loye"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
            SL
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Setemi Loye</h1>
            <p className="text-xl text-primary font-medium mt-1">
              Full-Stack Developer
            </p>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Passionate full-stack developer with 5+ years of experience
              building scalable web applications. I love creating efficient,
              user-friendly solutions that solve real-world problems.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Lagos, NG</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Available for projects</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Setemi_Loye_Resume.pdf"
            >
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="secondary" className="border-border">
                <Mail className="h-4 w-4 mr-2" />
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills & Technologies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSkills).map(([category, skillList]) => (
            <Card key={category} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="capitalize text-foreground">
                  {category}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {category == "tools"
                    ? `Tools I use for Development`
                    : `Technologies I work with in ${category.toLowerCase()} development`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillList.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="h-4 w-4"
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
        <h2 className="text-2xl font-bold text-foreground">Experience</h2>

        <div className="space-y-6">
          {experience.map((job, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-foreground">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/50 text-secondary-foreground"
                  >
                    {job.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
