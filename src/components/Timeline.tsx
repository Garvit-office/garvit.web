import { motion } from "framer-motion";
import { Trophy, Award, Code, Users, BookOpen, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export const Timeline = () => {
  const achievements = [
    {
      year: "2024",
      icon: Trophy,
      title: "First Place - National Hackathon",
      description: "Won first place at TechCrunch Disrupt Hackathon with an AI-powered mental health app",
      category: "Hackathon"
    },
    {
      year: "2024",
      icon: Award,
      title: "Dean's List Achievement",
      description: "Recognized for academic excellence with 3.9+ GPA for 3 consecutive semesters",
      category: "Academic"
    },
    {
      year: "2023",
      icon: Code,
      title: "Open Source Contributor",
      description: "Made 50+ contributions to popular open-source projects including React and TensorFlow",
      category: "Open Source"
    },
    {
      year: "2023",
      icon: Users,
      title: "Tech Club President",
      description: "Led a team of 30+ students, organizing workshops and coding competitions",
      category: "Leadership"
    },
    {
      year: "2023",
      icon: Sparkles,
      title: "AWS Certification",
      description: "Achieved AWS Solutions Architect Associate certification",
      category: "Certification"
    },
    {
      year: "2022",
      icon: BookOpen,
      title: "Research Publication",
      description: "Published paper on ML optimization techniques in IEEE conference",
      category: "Research"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="timeline" className="py-20 relative">
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
            Timeline of <span className="text-gradient">Achievements</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            Key milestones and accomplishments throughout my journey
          </motion.p>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary to-accent" />

              {achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`relative mb-8 ${
                    idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                  }`}
                >
                  <Card className={`glass p-6 ml-16 md:ml-0 ${
                    idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-x-20 md:-translate-x-1/2 w-16 h-16 bg-card border-4 border-primary rounded-full flex items-center justify-center">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <Badge className="mb-2 gradient-accent text-white border-0">
                      {achievement.year}
                    </Badge>
                    
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {achievement.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};