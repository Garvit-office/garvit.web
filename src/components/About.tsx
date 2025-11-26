import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Target } from "lucide-react";
import { Card } from "./ui/card";

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 relative">
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
            About <span className="text-gradient">Me</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            Learn more about my journey, education, and aspirations
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div variants={itemVariants}>
              <Card className="glass p-6 hover:shadow-xl transition-shadow">
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground mb-2">Stanford University</p>
                <p className="text-sm text-muted-foreground">B.S. Computer Science</p>
                <p className="text-sm text-primary font-semibold">GPA: 3.9/4.0</p>
                <p className="text-sm text-muted-foreground">Expected: May 2025</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="glass p-6 hover:shadow-xl transition-shadow">
                <Target className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Current Focus</h3>
                <p className="text-muted-foreground mb-2">Learning & Building</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Advanced Machine Learning</li>
                  <li>• Cloud Architecture</li>
                  <li>• System Design</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="glass p-6 hover:shadow-xl transition-shadow">
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interests</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Artificial Intelligence</li>
                  <li>• Full-Stack Development</li>
                  <li>• Open Source</li>
                  <li>• Tech Communities</li>
                </ul>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <Card className="glass p-8">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate computer science student at Stanford University with a deep interest in 
                  artificial intelligence and full-stack development. My journey in tech started during high 
                  school when I built my first web application, and I haven't looked back since.
                </p>
                <p>
                  Throughout my academic career, I've maintained a strong GPA while actively participating in 
                  hackathons, research projects, and open-source contributions. I believe in learning by doing, 
                  which is why I've worked on numerous projects ranging from ML models to full-stack applications.
                </p>
                <p>
                  Beyond coding, I'm an avid tech blogger, mentoring aspiring developers, and contributing to 
                  the tech community. I'm currently seeking internship opportunities where I can apply my skills 
                  and continue learning from experienced professionals.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};