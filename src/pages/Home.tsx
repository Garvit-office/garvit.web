import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ArrowRight, Code, Zap, Lightbulb, LogOut, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "@/components/Typewriter";
import FeedSection from "@/components/Feed/FeedSection";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const [cgpa, setCgpa] = useState(() => {
    const saved = localStorage.getItem("userCgpa");
    return saved ? parseFloat(saved) : 8.78;
  });

  // Projects count
  const projectsCount = 3;

  // Save CGPA to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userCgpa", cgpa.toString());
  }, [cgpa]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="min-h-screen md:min-h-[70vh] flex items-center justify-center px-3 md:px-4 py-12 md:py-20 border-b border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Badge className="mb-3 md:mb-4 gradient-primary text-white border-0 rounded-full px-3 md:px-4 text-xs md:text-sm">
                Open to Opportunities
              </Badge>
              
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Hi, I'm
                <br />
                <span className="inline-block" style={{ background: 'linear-gradient(135deg, hsl(280 100% 60%) 0%, hsl(270 100% 60%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <Typewriter text="Garvit Chawla" speed={100} />
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-xl">
                Full Stack Developer • AI Enthusiast • Builder of scalable web experiences
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                <Link to="/projects" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-primary text-white rounded-full neon-glow text-sm md:text-base">
                    View Projects
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </Link>
                <a href="/Garvit_Chawla-Software_Engineer.pdf" download="Garvit_Chawla-Software_Engineer.pdf" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-2 text-sm md:text-base">
                    Download Resume
                    <Download className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
              </div>
              
              <div className="flex gap-2 md:gap-3">
                <a href="https://github.com/garvit0080" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12">
                    <Github className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
                <a href="https://linkedin.com/in/garvit-chawla" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12">
                    <Linkedin className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
                <a href="mailto:garvitchawla.office@gmail.com">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12">
                    <Mail className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="flex flex-col gap-3 md:gap-6">
                {/* Card 1 - Development */}
                <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-accent/30 hover:border-accent/60 transition-all w-full cursor-pointer">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-accent rounded-lg md:rounded-2xl flex-shrink-0">
                      <Code className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base md:text-lg mb-1">Full Stack & AI/ML</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Building modern products and intelligent systems</p>
                    </div>
                  </div>
                </Card>

                {/* Card 2 - Innovation */}
                <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-accent/30 hover:border-accent/60 transition-all w-full cursor-pointer">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-accent to-primary rounded-lg md:rounded-2xl flex-shrink-0">
                      <Lightbulb className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base md:text-lg mb-1">Problem Solver</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Turning ideas into practical, polished experiences</p>
                    </div>
                  </div>
                </Card>

                {/* Card 3 - Performance */}
                <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-accent/30 hover:border-accent/60 transition-all w-full cursor-pointer">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-secondary to-accent rounded-lg md:rounded-2xl flex-shrink-0">
                      <Zap className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base md:text-lg mb-1">Scalable Systems</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Fast, clean, and maintainable builds</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FeedSection />

      {/* About Section */}
      <section className="py-12 md:py-20 px-3 md:px-4 border-t border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-6 text-center">
              About <span className="inline-block text-gradient">Me</span>
            </h2>
            
            <Card className="glass p-4 md:p-8 rounded-2xl md:rounded-3xl">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
                I'm Garvit Chawla, a computer science student at Chitkara University focused on full stack development,
                AI/ML, and building practical digital products.
              </p>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {/* CGPA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-muted/30 rounded-xl md:rounded-2xl"
                >
                  <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                    {cgpa.toFixed(2)}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">CGPA</p>
                </motion.div>

                {/* Projects Count */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-muted/30 rounded-xl md:rounded-2xl"
                >
                  <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                    {projectsCount}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">Projects</p>
                </motion.div>

              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Auth Status & Logout */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary to-accent p-1 rounded-full"
          >
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="bg-background rounded-full flex items-center gap-2"
            >
              <span className="text-xs md:text-sm">Logout</span>
              <LogOut className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;