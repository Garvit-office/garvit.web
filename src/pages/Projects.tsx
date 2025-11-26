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
      title: "AI Chatbot",
      category: "AI/ML",
      image: aiProject,
      description: "Intelligent conversational AI assistant with natural language processing",
      techStack: ["Python", "TensorFlow", "React"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "E-Commerce Platform",
      category: "Web Dev",
      image: webProject,
      description: "Full-featured online shopping experience with payment integration",
      techStack: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "Fitness App",
      category: "Mobile",
      image: mobileProject,
      description: "Track workouts and nutrition with AI-powered recommendations",
      techStack: ["React Native", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
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
            My <span className="text-gradient">Projects</span>
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