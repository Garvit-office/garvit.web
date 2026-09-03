"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Code, 
  Zap, 
  Lightbulb, 
  LogOut, 
  Download,
  Terminal,
  Cpu,
  Check,
  Copy,
  ExternalLink,
  Activity
} from "lucide-react";
import Link from "next/link";
import { Typewriter } from "@/components/Typewriter";
import FeedSection from "@/components/Feed/FeedSection";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/useAuth";

const techSkills = [
  "Next.js 15", "React 19", "FastAPI", "Python", "LangGraph", "Mem0", 
  "Tailwind CSS", "Node.js", "MongoDB", "TypeScript", "Docker", "Vosk"
];

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const [cgpa, setCgpa] = useState(8.78);
  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState(24);

  const projectsCount = 5;

  // Hydrate CGPA from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userCgpa");
    if (saved) {
      const parsed = Number.parseFloat(saved);
      if (Number.isFinite(parsed)) setCgpa(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userCgpa", cgpa.toString());
  }, [cgpa]);

  // Simulate realistic network telemetry ping
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(20 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const copyContactCmd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("npx garvit");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <section className="min-h-screen md:min-h-[70vh] flex items-center justify-center px-3 md:px-4 py-12 md:py-20 border-b border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
            
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <Link href="/contact" className="inline-block group">
                <Badge className="mb-3 md:mb-4 gradient-primary text-white border-0 rounded-full px-3.5 md:px-4 py-1 text-xs md:text-sm cursor-pointer transition-all duration-200 group-hover:scale-105 group-hover:shadow-md active:scale-95 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  Open to Opportunities
                </Badge>
              </Link>
              
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Hi, I'm
                <br />
                <span className="inline-block" style={{ background: 'linear-gradient(135deg, hsl(280 100% 60%) 0%, hsl(270 100% 60%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <Typewriter text="Garvit Chawla" speed={100} />
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-xl leading-relaxed">
                Full Stack Developer • AI Enthusiast • Builder of scalable web experiences
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                <Link href="/projects" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-primary text-white rounded-full neon-glow text-sm md:text-base transition-all hover:brightness-110 active:scale-95 shadow-md">
                    View Projects
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </Link>
                <a href="/Garvit_Chawla-Software_Engineer.pdf" download="Garvit_Chawla-Software_Engineer.pdf" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-2 text-sm md:text-base hover:bg-muted active:scale-95 transition-all">
                    Download Resume
                    <Download className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3">
                <a href="https://github.com/garvit0080" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-2 hover:border-accent hover:text-primary transition-all active:scale-95">
                    <Github className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
                <a href="https://linkedin.com/in/garvit-chawla" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-2 hover:border-accent hover:text-primary transition-all active:scale-95">
                    <Linkedin className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
                <a href="mailto:garvitchawla.office@gmail.com" aria-label="Send Email">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-2 hover:border-accent hover:text-primary transition-all active:scale-95">
                    <Mail className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
            
            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full"
            >
              <div className="flex flex-col gap-3 md:gap-4">
                
                {/* Card 1 - Development */}
                <Link href="/projects" className="w-full block group">
                  <Card className="glass p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 border-accent/30 group-hover:border-accent/80 transition-all duration-300 w-full cursor-pointer group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-accent rounded-lg md:rounded-2xl shrink-0 group-hover:scale-105 transition-transform">
                        <Code className="h-5 md:h-6 w-5 md:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-lg mb-1 flex items-center justify-between">
                          <span>Full Stack & AI/ML</span>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">Building modern products and intelligent systems</p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Card 2 - Innovation */}
                <Link href="/timeline" className="w-full block group">
                  <Card className="glass p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 border-accent/30 group-hover:border-accent/80 transition-all duration-300 w-full cursor-pointer group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-gradient-to-br from-accent to-primary rounded-lg md:rounded-2xl shrink-0 group-hover:scale-105 transition-transform">
                        <Lightbulb className="h-5 md:h-6 w-5 md:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-lg mb-1 flex items-center justify-between">
                          <span>Problem Solver</span>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">Turning ideas into practical, polished experiences</p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Card 3 - Performance */}
                <Link href="/projects" className="w-full block group">
                  <Card className="glass p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 border-accent/30 group-hover:border-accent/80 transition-all duration-300 w-full cursor-pointer group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-gradient-to-br from-secondary to-accent rounded-lg md:rounded-2xl shrink-0 group-hover:scale-105 transition-transform">
                        <Zap className="h-5 md:h-6 w-5 md:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-lg mb-1 flex items-center justify-between">
                          <span>Scalable Systems</span>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">Fast, clean, and maintainable builds</p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Interactive Runtime Telemetry Terminal */}
                <div className="rounded-2xl md:rounded-3xl border-2 border-accent/30 bg-card/60 p-4 font-mono text-xs backdrop-blur-md shadow-xs transition-all hover:border-accent/70">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Terminal className="h-3.5 w-3.5 text-primary" />
                      <span>runtime.telemetry</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                        <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
                        {latency}ms
                      </span>
                      <button
                        onClick={copyContactCmd}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy command"
                      >
                        {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-muted-foreground">
                    <p className="flex items-center justify-between">
                      <span><span className="text-foreground font-semibold">education:</span> B.E. Computer Science</span>
                      <span className="text-[10px] opacity-75">2023–2027</span>
                    </p>
                    <p>
                      <span className="text-foreground font-semibold">agent_core:</span> LangGraph Memory (Mem0)
                    </p>
                    <p className="flex items-center justify-between pt-1 border-t border-border/40">
                      <span className="text-foreground font-semibold">status:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">READY_TO_DEPLOY</span>
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Running Skill Marquee with Dual Gradient Fade Masks */}
      <div className="relative py-4 border-b border-border/60 overflow-hidden bg-muted/10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 whitespace-nowrap">
          {[...techSkills, ...techSkills].map((tech, i) => (
            <Link 
              key={i} 
              href="/projects" 
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-background/70 px-4 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-accent/70 hover:scale-105 transition-all shadow-2xs"
            >
              <Cpu className="h-3 w-3 text-primary" />
              {tech}
            </Link>
          ))}
        </div>
      </div>

      <FeedSection />

      {/* About Section */}
      <section className="py-12 md:py-20 px-3 md:px-4 border-t border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-6 text-center">
              About <span className="inline-block text-gradient">Me</span>
            </h2>
            
            <Card className="glass p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                I'm Garvit Chawla, a computer science student at Chitkara University focused on full stack development,
                AI/ML, and building practical digital products.
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {/* CGPA */}
                <Link href="/timeline" className="block group">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-center p-3 md:p-4 bg-muted/30 group-hover:bg-muted/60 border border-transparent group-hover:border-accent/40 rounded-xl md:rounded-2xl transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                        {cgpa.toFixed(2)}
                      </p>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1" />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">CGPA • View Timeline</p>
                  </motion.div>
                </Link>

                {/* Projects Count */}
                <Link href="/projects" className="block group">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-center p-3 md:p-4 bg-muted/30 group-hover:bg-muted/60 border border-transparent group-hover:border-accent/40 rounded-xl md:rounded-2xl transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                        {projectsCount}
                      </p>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1" />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">Projects • Explore Repos</p>
                  </motion.div>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Floating Auth Status & Logout */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary to-accent p-1 rounded-full shadow-lg"
          >
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="bg-background rounded-full flex items-center gap-2 hover:bg-background/90"
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
