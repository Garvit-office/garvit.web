import { motion } from "framer-motion";
import {
  Users,
  Target,
  Briefcase,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import trainerImg from "@/assets/c7a21274-86b5-4cf0-a5f6-b30ea22f87c0.jpg";
import innovationImg from "@/assets/IMG_7308.jpg";
import clientRelImg from "@/assets/122670330_4483454891729606_4957190552676086176_n.jpg";
import beChitkaraImg from "@/assets/download.png";
import geeky from "@/assets/IMG_1349.jpeg";
// Replaced missing "@/assets/IMG_0740.jpg"
const presidentImg = innovationImg;

const achievements = [
  {
    year: "June 2026 - Present",
    icon: Briefcase,
    title: "Software Engineer - GeekyAnts",
    description:
      "Working as a Software Engineer at GeekyAnts, contributing to software development and building scalable web applications.",
    image: geeky,
    category: "Experience",
    color: "from-green-400 to-green-600",
    bgGradient: "bg-gradient-to-br from-green-100 to-green-50",
  },
  {
    year: "2025",
    icon: Lightbulb,
    title: "Innovation Ambassador",
    description:
      "Recognized for promoting innovation, entrepreneurship, and design thinking across the university community.",
    image: innovationImg,
    category: "Leadership",
    color: "from-yellow-400 to-orange-500",
    bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-50",
  },
  {
    year: "2024-25",
    icon: Target,
    title: "Client Relations Specialist",
    description:
      "Managed client relationships, communication, and coordination while ensuring successful project delivery.",
    image: clientRelImg,
    category: "Experience",
    color: "from-purple-400 to-purple-600",
    bgGradient: "bg-gradient-to-br from-purple-100 to-purple-50",
  },
  {
    year: "2024",
    icon: Briefcase,
    title: "Web Development Trainer",
    description:
      "Trained students in web development concepts, technologies, and practical project implementation.",
    image: trainerImg,
    category: "Experience",
    color: "from-blue-400 to-blue-600",
    bgGradient: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    year: "2024-2025",
    icon: Users,
    title: "President - Design Thinking Society",
    description:
      "Led the Design Thinking Society, organizing activities and encouraging students to develop innovative solutions.",
    image: presidentImg,
    category: "Leadership",
    color: "from-pink-400 to-pink-600",
    bgGradient: "bg-gradient-to-br from-pink-100 to-pink-50",
  },
  {
    year: "2023",
    icon: GraduationCap,
    title: "B.E. Computer Science",
    description:
      "Started my Bachelor of Engineering in Computer Science and Engineering at Chitkara University.",
    image: beChitkaraImg,
    category: "Education",
    color: "from-indigo-400 to-indigo-600",
    bgGradient: "bg-gradient-to-br from-indigo-100 to-indigo-50",
  },
];

const Timeline = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My Journey
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my education, leadership experiences, and professional
            journey.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${achievement.title}-${achievement.year}`}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline icon */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex w-14 h-14 rounded-full bg-gradient-to-br ${achievement.color} items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <Card
                    className={`w-full md:w-[45%] overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${achievement.bgGradient}`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={achievement.image.src}
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-foreground hover:bg-background">
                          {achievement.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center md:hidden`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <span className="text-sm font-semibold text-muted-foreground">
                          {achievement.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3">
                        {achievement.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
