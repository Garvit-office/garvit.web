import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import aiProject from "@/assets/project-ai.jpg";
import webProject from "@/assets/project-web.jpg";
import mobileProject from "@/assets/project-mobile.jpg";

const Projects = () => {
  const projects = [
    {
      title: "AI Personal Assistant",
      category: "AI/Python",
      image: aiProject,
      description: "Offline assistant using Vosk, Speech Recognition, and LLM. Supports automation tasks and local processing.",
      techStack: ["Python", "Vosk", "LLM"],
      liveUrl: "https://github.com/garvit0080",
      githubUrl: "https://github.com/garvit0080"
    },
    {
      title: "Flego - Travel Blogging Platform",
      category: "MERN Stack",
      image: webProject,
      description: "Full-featured travel blogging platform with authentication, user profiles, and image uploads.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/garvit0080"
    },
    {
      title: "Lernuage - Language Learning App",
      category: "Web Development",
      image: mobileProject,
      description: "Interactive language learning platform with vocabulary quizzes and structured learning modules.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/garvit0080"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            My <span className="inline-block text-gradient">Projects</span>
          </h1>
          
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            A collection of my technical work and creative solutions
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass overflow-hidden h-full flex flex-col rounded-3xl hover:shadow-xl transition-all group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <Badge className="mb-3 w-fit rounded-full">{project.category}</Badge>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs rounded-full">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button size="sm" className="flex-1 gradient-primary text-white rounded-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 rounded-full">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;