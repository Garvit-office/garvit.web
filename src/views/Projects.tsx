"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import aiProject from "@/assets/IMG_5407.jpg";
import webProject from "@/assets/project-web.jpg";
import mobileProject from "@/assets/project-mobile.jpg";
import projectBlogImg from "@/assets/image.png";
import cardImg from "@/assets/card.png";
import Image from "next/image";
import granny from "@/assets/IMG_2831.png";
import florista from "@/assets/florista-removebg-preview.png";
import chawla from "@/assests/Chawla.zip_-_12-removebg-preview.png";
import minion from "@/assests/image.png";
import veena from "@/assests/veena.png";


const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "NutriAI",
      category: "AI",
      image: granny,
      featured: true,
      description:
        "AI-powered preventive health and nutrition platform combining personalized nutrition intelligence, food recognition, health tracking, and secure offline-first data persistence.",
      techStack: [
        "React Native",
        "Expo",
        "TypeScript",
        "SQLite",
        "Supabase",
        "AI",
      ],
      highlights: [
        "Offline-first architecture",
        "Deterministic nutrition engine",
        "AI food recognition",
        "Food compatibility engine",
        "Health intelligence",
        "Secure user-scoped data",
      ],
      liveUrl: "https://github.com/Garvit-office/granny-A-Health-App",
      githubUrl: "https://github.com/Garvit-office/granny-A-Health-App",
    },
    {
      title: "Self-Learning AI Agent",
      category: "AI",
      image: aiProject,
      description:
        "Self-learning personal AI assistant powered by LangGraph, Groq, and Mem0 for semantic long-term memory and contextual persistence.",
      techStack: ["React", "Vite", "FastAPI", "LangGraph", "Mem0", "Groq"],
      liveUrl: "https://self-learning-teal.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/self-learning",
    },
    {
      title: "AI Personal Assistant",
      category: "AI",
      image: projectBlogImg,
      description:
        "Offline assistant using Vosk, speech recognition, and LLM technologies with local processing automation capabilities.",
      techStack: ["Python", "Vosk", "Speech Recognition", "LLM"],
      liveUrl: "https://github.com/Garvit-office/leo",
      githubUrl: "https://github.com/Garvit-office/leo",
    },
    {
      title: "Chawla Trading Company",
      category: "Web",
      image: chawla,
      description:
        "Professional digital platform built for agricultural commercial ventures, seeds, pesticides, and grain commission merchandising.",
      techStack: ["React", "Tailwind CSS", "Node.js"],
      liveUrl: "https://chawlatradingcompany.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/Chawlatradingcompany",
    },
    {
      title: "Chawla Trading Digital Card",
      category: "Web",
      image: chawla,
      description:
        "A lightweight digital business card showcasing contact information and quick commercial links for Chawla Trading Company.",
      techStack: ["React", "Vercel"],
      liveUrl: "https://chawlatradingcomapany-card.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/Chawlatradingcompany",
    },
    {
      title: "Vaishnavi Portfolio (Minion Theme)",
      category: "Client Projects",
      image: minion,
      description:
        "Custom client portfolio website featuring a creative minion theme design, smooth animations, and a fully responsive layout.",
      techStack: ["React", "Tailwind CSS", "Vercel"],
      liveUrl: "https://vaishnavi-web-ten.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/vaishnavi.web",
    },
    {
      title: "Veena Portfolio Sample",
      category: "Client Projects",
      image: veena,
      description:
        "Modern professional portfolio sample built for a client to seamlessly showcase creative works, skills, and projects.",
      techStack: ["React", "JavaScript", "Tailwind CSS"],
      liveUrl: "https://veena-omega.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/veena",
    },
    {
      title: "Flego - Travel Blogging Platform",
      category: "Full Stack",
      image: webProject,
      description:
        "Full-featured travel blogging platform with user authentication, profile management, image uploads, and content management.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://flego.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/Flego",
    },
    {
      title: "Lernuage - Language Learning App",
      category: "Web",
      image: mobileProject,
      description:
        "Interactive language learning platform equipped with vocabulary quizzes and structured learning modules.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://github.com/garvit0080/learnuage",
      githubUrl: "https://github.com/garvit0080/learnuage",
    },
    {
      title: "garvit.card",
      category: "Web",
      image: cardImg,
      description:
        "A lightweight personal card website showcasing professional contact information and quick links through a minimal interface.",
      techStack: ["React", "Vercel"],
      liveUrl: "https://garvitchawla-card.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/garvitchawla.card",
    },
  ];

  const categories = ["All", "AI", "Full Stack", "Client Projects", "Web"];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border bg-background/60 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Selected Work</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            My <span className="inline-block text-gradient">Projects</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated portfolio of AI, full-stack, mobile, and client solutions engineered for high performance.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="rounded-full px-5 transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.4,
                }}
                whileHover={{ y: -6 }}
                className={project.featured && activeFilter === "All" ? "lg:col-span-2" : ""}
              >
                <Card
                  className={`
                    group relative overflow-hidden
                    h-full flex flex-col
                    rounded-3xl
                    border
                    bg-background/60
                    backdrop-blur-xl
                    transition-all duration-500
                    hover:shadow-2xl
                    ${project.featured && activeFilter === "All" ? "ring-1 ring-primary/20" : ""}
                  `}
                >
                  {/* Featured badge */}
                  {project.featured && activeFilter === "All" && (
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="rounded-full px-3 py-1 backdrop-blur-md">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured Project
                      </Badge>
                    </div>
                  )}

                  {/* Image container */}
                  <div
                    className={`
                      relative w-full overflow-hidden
                      ${project.featured && activeFilter === "All" ? "h-72 md:h-96" : "h-56"}
                    `}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      priority={project.featured}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70" />
                    
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="rounded-full bg-background/80 backdrop-blur-md border">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`font-bold mb-3 ${project.featured && activeFilter === "All" ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                      {project.title}
                    </h3>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Highlights if featured */}
                    {project.featured && activeFilter === "All" && project.highlights && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {project.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ShieldCheck className="h-4 w-4 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs rounded-full px-3 py-1 font-medium">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full rounded-full gradient-primary text-white group/button">
                          {project.featured && activeFilter === "All" ? (
                            <Smartphone className="h-4 w-4 mr-2" />
                          ) : (
                            <ExternalLink className="h-4 w-4 mr-2" />
                          )}
                          {project.featured && activeFilter === "All" ? "Explore" : "Live"}
                          <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                        </Button>
                      </a>

                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full rounded-full">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
