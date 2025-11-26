import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "C++", level: 75 },
        { name: "SQL", level: 85 },
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React/Next.js", level: 90 },
        { name: "Node.js/Express", level: 85 },
        { name: "TensorFlow/PyTorch", level: 80 },
        { name: "FastAPI/Flask", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker/Kubernetes", level: 75 },
        { name: "AWS/GCP", level: 70 },
        { name: "MongoDB/PostgreSQL", level: 85 },
        { name: "Redis", level: 70 },
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", level: 95 },
        { name: "Team Collaboration", level: 90 },
        { name: "Communication", level: 85 },
        { name: "Leadership", level: 80 },
        { name: "Time Management", level: 85 },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 relative">
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
            Skills & <span className="text-gradient">Technologies</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical expertise and capabilities
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="glass p-6 h-full">
                  <h3 className="text-2xl font-semibold mb-6">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.level}%
                          </Badge>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIdx * 0.1 }}
                            className="h-full gradient-primary"
                          />
                        </div>
                      </div>
                    ))}
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