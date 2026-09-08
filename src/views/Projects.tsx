import { motion } from "framer-motion";
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
import self from "@/assets/Screenshot 2026-09-08 111215.png";


const Projects = () => {
  const projects = [
    {
      title: "NutriAI",
      category: "AI / HealthTech / Mobile",
      image: granny,
      featured: true,
      description:
        "AI-powered preventive health and nutrition platform combining personalized nutrition intelligence, food recognition, health tracking, food compatibility, medical insights, offline-first persistence, and preventive health awareness.",
      techStack: [
        "React Native",
        "Expo",
        "TypeScript",
        "SQLite",
        "Supabase",
        "AI",
        "Health APIs",
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
      category: "AI / Full Stack",
      image: aiProject,
      description:
        "Self-learning personal AI assistant powered by LangGraph, Groq, and Mem0 for semantic long-term memory and contextual persistence.",
      techStack: [
        "React",
        "Vite",
        "FastAPI",
        "LangGraph",
        "Mem0",
        "Groq",
      ],
      liveUrl: "https://self-learning-teal.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/self-learning",
    },

    {
      title: "AI Personal Assistant",
      category: "AI / Python",
      image: projectBlogImg,
      description:
        "Offline assistant using Vosk, speech recognition, and LLM technologies with automation capabilities and local processing.",
      techStack: ["Python", "Vosk", "Speech Recognition", "LLM"],
      liveUrl:
        process.env.NODE_ENV === "production"
          ? "https://github.com/Garvit-office/leo"
          : "https://github.com/Garvit-office/leo",
      githubUrl:
        process.env.NODE_ENV === "production"
          ? "https://github.com/Garvit-office/leo"
          : "https://github.com/Garvit-office/leo",
    },

    {
      title: "Flego - Travel Blogging Platform",
      category: "MERN Stack",
      image: webProject,
      description:
        "Full-featured travel blogging platform with authentication, user profiles, image uploads, and a complete content management experience.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl:
        process.env.NODE_ENV === "production"
          ? "https://flego.vercel.app/"
          : "https://github.com/Garvit-office/Flego",
      githubUrl:
        process.env.NODE_ENV === "production"
          ? "https://github.com/Garvit-office/Flego"
          : "http://localhost:3001/github/flego",
      
    },

    {
      title: "Lernuage - Language Learning App",
      category: "Web Development",
      image: mobileProject,
      description:
        "Interactive language learning platform with vocabulary quizzes and structured learning modules.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl:
        process.env.NODE_ENV === "production"
          ? "https://github.com/garvit0080/learnuage"
          : "https://github.com/garvit0080/learnuage",
      githubUrl:
        process.env.NODE_ENV === "production"
          ? "https://github.com/garvit0080/learnuage"
          : "https://github.com/garvit0080/learnuage",
    },

    {
      title: "garvit.card",
      category: "Web / Personal Card",
      image: cardImg,
      description:
        "A lightweight personal card website showcasing contact information and quick links through a minimal interface.",
      techStack: ["React", "Vercel"],
      liveUrl: "https://garvitchawla-card.vercel.app/",
      githubUrl: "https://github.com/Garvit-office/garvitchawla.card",
    },
  ];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border bg-background/60 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">
              Selected Work
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            My{" "}
            <span className="inline-block text-gradient">
              Projects
            </span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of AI, full-stack, mobile, and software
            engineering projects focused on solving real-world problems.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
                duration: 0.55,
              }}
              whileHover={{ y: -8 }}
              className={project.featured ? "lg:col-span-2" : ""}
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
                  ${
                    project.featured
                      ? "ring-1 ring-primary/20"
                      : ""
                  }
                `}
              >

                {/* Featured label */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="rounded-full px-3 py-1 backdrop-blur-md">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Featured Project
                    </Badge>
                  </div>
                )}

                {/* Image */}
                <div
                  className={`
                    relative w-full overflow-hidden
                    ${
                      project.featured
                        ? "h-72 md:h-96"
                        : "h-56"
                    }
                  `}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    priority={project.featured}
                    sizes={
                      project.featured
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  {/* Image overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/60
                      via-black/10
                      to-transparent
                      opacity-70
                    "
                  />

                  {/* Floating category */}
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      variant="secondary"
                      className="
                        rounded-full
                        bg-background/80
                        backdrop-blur-md
                        border
                      "
                    >
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">

                  <h3
                    className={`
                      font-bold mb-3
                      ${
                        project.featured
                          ? "text-3xl md:text-4xl"
                          : "text-2xl"
                      }
                    `}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Featured highlights */}
                  {project.featured && project.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {project.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="
                            flex items-center gap-2
                            text-sm
                            text-muted-foreground
                          "
                        >
                          <ShieldCheck className="h-4 w-4 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="
                            text-xs
                            rounded-full
                            px-3 py-1
                            font-medium
                          "
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-auto">

                    <a
                      href={project.liveUrl}
                      target={
                        project.liveUrl.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        project.liveUrl.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex-1"
                    >
                      <Button
                        className="
                          w-full
                          rounded-full
                          gradient-primary
                          text-white
                          group/button
                        "
                      >
                        {project.featured ? (
                          <Smartphone className="h-4 w-4 mr-2" />
                        ) : (
                          <ExternalLink className="h-4 w-4 mr-2" />
                        )}

                        {project.featured
                          ? "Explore"
                          : "Live"}

                        <ArrowUpRight
                          className="
                            h-4 w-4 ml-2
                            transition-transform
                            group-hover/button:translate-x-0.5
                            group-hover/button:-translate-y-0.5
                          "
                        />
                      </Button>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-full"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </a>

                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Projects;
