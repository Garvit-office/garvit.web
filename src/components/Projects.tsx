import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import aiProject from "@/assets/project-ai.jpg";
import webProject from "@/assets/project-web.jpg";
import mobileProject from "@/assets/project-mobile.jpg";

export const Projects = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "AI/ML", "Web Dev", "Mobile", "Open Source"];

  const projects = [
    {
      title: "AI-Powered Chatbot",
      tagline: "Intelligent conversational AI assistant",
      category: "AI/ML",
      image: aiProject,
      description: "Built an advanced chatbot using natural language processing and machine learning to provide intelligent responses and learn from user interactions.",
      techStack: ["Python", "TensorFlow", "FastAPI", "React"],
      features: [
        "Natural language understanding",
        "Context-aware responses",
        "Multi-language support",
        "Real-time learning"
      ],
      challenges: "Implementing context retention across conversations and optimizing response time.",
      impact: "Increased user engagement by 250% and reduced support tickets by 40%",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "E-Commerce Platform",
      tagline: "Full-featured online shopping experience",
      category: "Web Dev",
      image: webProject,
      description: "Developed a comprehensive e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Shopping cart & wishlist",
        "Secure payment processing",
        "Admin dashboard",
        "Order tracking"
      ],
      challenges: "Handling concurrent transactions and ensuring data consistency.",
      impact: "Processed $50K+ in transactions with 99.9% uptime",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "Fitness Tracking App",
      tagline: "Your personal health companion",
      category: "Mobile",
      image: mobileProject,
      description: "Created a mobile app for tracking workouts, nutrition, and health metrics with personalized recommendations powered by ML.",
      techStack: ["React Native", "Firebase", "Python", "ML"],
      features: [
        "Workout logging",
        "Nutrition tracking",
        "Progress analytics",
        "AI recommendations"
      ],
      challenges: "Optimizing battery usage and ensuring offline functionality.",
      impact: "5K+ downloads with 4.8★ rating on app stores",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto"
          >
            Showcasing my best work and technical achievements
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={filter === cat ? "gradient-primary text-background" : ""}
              >
                {cat}
              </Button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                layout
              >
                <Card className="glass overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <Badge className="mb-2 w-fit">{project.category}</Badge>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.tagline}</p>
                    
                    <p className="text-sm text-foreground/80 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Key Features:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-secondary/50 p-3 rounded-lg mb-4">
                      <p className="text-xs font-semibold text-primary mb-1">Impact:</p>
                      <p className="text-xs text-muted-foreground">{project.impact}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button size="sm" className="flex-1 gradient-primary text-background">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
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
    </section>
  );
};