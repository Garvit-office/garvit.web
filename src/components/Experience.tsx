import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      company: "TechCorp Inc.",
      role: "Software Engineering Intern",
      duration: "Jun 2024 - Aug 2024",
      location: "San Francisco, CA",
      responsibilities: [
        "Developed and deployed 3 microservices using Node.js and Docker",
        "Improved API response time by 40% through optimization",
        "Collaborated with cross-functional teams in Agile environment",
        "Implemented automated testing reducing bugs by 30%"
      ],
      achievements: [
        "Received 'Outstanding Intern' award",
        "Contributed to production code serving 1M+ users"
      ],
      techStack: ["Node.js", "React", "Docker", "AWS", "MongoDB"]
    },
    {
      company: "AI Research Lab",
      role: "Research Assistant",
      duration: "Jan 2024 - May 2024",
      location: "Stanford University",
      responsibilities: [
        "Conducted research on neural network optimization techniques",
        "Implemented and tested novel ML algorithms in Python",
        "Analyzed experimental results and wrote technical reports",
        "Presented findings at university research symposium"
      ],
      achievements: [
        "Co-authored paper accepted at IEEE conference",
        "Improved model accuracy by 15%"
      ],
      techStack: ["Python", "TensorFlow", "PyTorch", "NumPy", "Jupyter"]
    },
    {
      company: "StartupXYZ",
      role: "Full-Stack Developer Intern",
      duration: "Jun 2023 - Aug 2023",
      location: "Remote",
      responsibilities: [
        "Built responsive web applications using React and TypeScript",
        "Designed and implemented RESTful APIs",
        "Integrated third-party services and payment systems",
        "Participated in code reviews and sprint planning"
      ],
      achievements: [
        "Launched 2 features used by 10K+ users",
        "Reduced page load time by 50%"
      ],
      techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Stripe"]
    }
  ];

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
    <section id="experience" className="py-20 relative">
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
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            Professional experience and internships that shaped my career
          </motion.p>

          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="glass p-6 md:p-8 hover:shadow-2xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex items-start gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                        <p className="text-lg text-primary font-semibold">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.duration}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-foreground/80">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">▹</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-accent">
                      Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-accent mr-2">★</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground/80">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
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