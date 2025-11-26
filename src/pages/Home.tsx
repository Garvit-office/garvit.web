import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 gradient-primary text-white border-0 rounded-full px-4">
                Open to Opportunities
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Hi, I'm{" "}
                <span className="text-gradient">Alex Johnson</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Computer Science Student · AI/ML Enthusiast · Poet
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/projects">
                  <Button size="lg" className="gradient-primary text-white rounded-full neon-glow">
                    View Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/poetry">
                  <Button size="lg" variant="outline" className="rounded-full border-2">
                    Read Poetry
                  </Button>
                </Link>
              </div>
              
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a href="mailto:alex@example.com">
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Mail className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-full" />
                <img
                  src={heroImage}
                  alt="Alex Johnson"
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <Card className="glass p-8 rounded-3xl">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate computer science student at Stanford University with a deep interest in 
                artificial intelligence and full-stack development. When I'm not coding, I express myself 
                through poetry and creative writing.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-2xl">
                  <p className="text-3xl font-bold text-gradient mb-2">3.9</p>
                  <p className="text-sm text-muted-foreground">GPA</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-2xl">
                  <p className="text-3xl font-bold text-gradient mb-2">15+</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-2xl">
                  <p className="text-3xl font-bold text-gradient mb-2">50+</p>
                  <p className="text-sm text-muted-foreground">Poems</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;