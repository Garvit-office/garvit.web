import { motion } from "framer-motion";
import { Trophy, Award, Code, Users, BookOpen, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Timeline = () => {
  const achievements = [
    {
      year: "2024",
      icon: Trophy,
      title: "National Hackathon Winner",
      description: "First place at TechCrunch Disrupt with AI mental health app",
      category: "Hackathon"
    },
    {
      year: "2024",
      icon: Award,
      title: "Dean's List",
      description: "Academic excellence with 3.9+ GPA",
      category: "Academic"
    },
    {
      year: "2023",
      icon: Code,
      title: "Open Source Contributor",
      description: "50+ contributions to React and TensorFlow",
      category: "Open Source"
    },
    {
      year: "2023",
      icon: Users,
      title: "Tech Club President",
      description: "Led team of 30+ students in organizing events",
      category: "Leadership"
    },
    {
      year: "2023",
      icon: Sparkles,
      title: "AWS Certified",
      description: "Solutions Architect Associate certification",
      category: "Certification"
    },
    {
      year: "2022",
      icon: BookOpen,
      title: "Research Published",
      description: "ML optimization paper in IEEE conference",
      category: "Research"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            My <span className="text-gradient">Timeline</span>
          </h1>
          
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Key milestones and achievements throughout my journey
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full" />

            <div className="space-y-8">
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative ${
                    idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                  }`}
                >
                  <Card className={`glass p-6 ml-16 md:ml-0 rounded-3xl hover:shadow-xl transition-all ${
                    idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-x-20 md:-translate-x-1/2 w-16 h-16 glass border-4 border-primary rounded-full flex items-center justify-center">
                      <achievement.icon className="h-7 w-7 text-primary" />
                    </div>
                    
                    <Badge className="mb-3 gradient-accent text-white border-0 rounded-full">
                      {achievement.year}
                    </Badge>
                    
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {achievement.description}
                    </p>
                    <Badge variant="outline" className="text-xs rounded-full">
                      {achievement.category}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;