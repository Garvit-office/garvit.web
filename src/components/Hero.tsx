import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 gradient-accent text-white border-0">
              Open to Opportunities
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm{" "}
              <span className="text-gradient">Alex Johnson</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
              Computer Science Student
            </p>
            
            <p className="text-xl text-muted-foreground mb-8">
              AI/ML Enthusiast | Full-Stack Developer
            </p>
            
            <p className="text-lg text-foreground/80 mb-8 max-w-xl">
              Passionate about building innovative solutions that leverage artificial intelligence
              and modern web technologies to solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="gradient-primary text-background glow">
                <FileDown className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
                View Projects
              </Button>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:alex@example.com">
                <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-full animate-glow" />
              <img
                src={heroImage}
                alt="Alex Johnson"
                className="relative rounded-2xl shadow-2xl w-full h-auto glass"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};