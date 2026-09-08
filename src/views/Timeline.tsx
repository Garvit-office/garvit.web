
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
import president from "@/assets/IMG_5407.jpg";
import geeky from "@/assets/IMG_1349.jpeg";

// Replaced missing "@/assets/IMG_0740.jpg" with innovationImg
// until the original asset is placed in src/assets
const presidentImg = president;

const Timeline = () => {
  const achievements = [
    {
      year: "June 2026 - Present",
      icon: Briefcase,
      title: "Software Engineer - GeekyAnts",
      description:
        "Working as a Software Engineer at GeekyAnts, Bengaluru, contributing to software development and building scalable web applications.",
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
        "Supported project development and conducted innovation workshops at Chitkara University",
      image: innovationImg,
      category: "Leadership",
      color: "from-yellow-400 to-yellow-600",
      bgGradient: "bg-gradient-to-br from-yellow-100 to-yellow-50",
    },
    {
      year: "2024-25",
      icon: Target,
      title: "Client Relations Specialist",
      description:
        "Managed communication and requirement gathering at Studio C.O.I.N",
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
        "Trained students in HTML, CSS, JS, React, Node.js, MongoDB at MJ Marketing",
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
        "Led design innovation activities and guided students in prototyping",
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
        "Pursuing degree at Chitkara University Institute of Engineering and Technology (2023-2027)",
      image: beChitkaraImg,
      category: "Education",
      color: "from-indigo-400 to-indigo-600",
      bgGradient: "bg-gradient-to-br from-indigo-100 to-indigo-50",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            My <span className="inline-block text-gradient">Timeline</span>
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
                  initial={{
                    opacity: 0,
                    x: idx % 2 === 0 ? -50 : 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.1,
                  }}
                  className={`relative ${
                    idx % 2 === 0
                      ? "md:pr-1/2"
                      : "md:pl-1/2 md:ml-auto"
                  }`}
                >
                  <Card
                    className={`glass p-6 ml-16 md:ml-0 rounded-3xl hover:shadow-xl transition-all overflow-hidden group ${
                      idx % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 ${achievement.bgGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                    />

                    {/* Content wrapper */}
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Achievement image */}
                        {achievement.image && (
                          <div className="w-full md:w-1/3 flex-shrink-0">
                            <img
                              src={
                                typeof achievement.image === "string"
                                  ? achievement.image
                                  : achievement.image.src
                              }
                              alt={achievement.title}
                              className="w-full h-40 md:h-32 lg:h-40 object-cover rounded-xl border border-white/10 dark:border-white/6"
                            />
                          </div>
                        )}

                        {/* Achievement content */}
                        <div
                          className={`${
                            achievement.image
                              ? "w-full md:w-2/3"
                              : "w-full"
                          }`}
                        >
                          {/* Icon circle */}
                          <div
                            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-x-20 w-16 h-16 glass border-4 border-white flex items-center justify-center rounded-full shadow-lg"
                            style={{
                              backgroundImage:
                                "linear-gradient(135deg, var(--tw-gradient-stops))",
                              backgroundPosition: "0% 0%",
                            }}
                          >
                            <div
                              className={`bg-gradient-to-br ${achievement.color} p-3 rounded-full`}
                            >
                              <achievement.icon className="h-7 w-7 text-white" />
                            </div>
                          </div>

                          {/* Year */}
                          <Badge className="mb-3 gradient-accent text-white border-0 rounded-full">
                            {achievement.year}
                          </Badge>

                          {/* Title */}
                          <h3 className="text-xl font-bold mb-2">
                            {achievement.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground text-sm mb-3">
                            {achievement.description}
                          </p>

                          {/* Category */}
                          <Badge
                            variant="outline"
                            className="text-xs rounded-full"
                          >
                            {achievement.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
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
```

### One correction I made

Your original code had:

```tsx
const presidentImg = innovationImg;
```

but you already import:

```tsx
import president from "@/assets/IMG_5407.jpg";
```

So I changed it to:

```tsx
const presidentImg = president;
```

That means your **President - Design Thinking Society** card now actually uses `IMG_5407.jpg`.

Your new timeline order is:

1. 💼 **Software Engineer - GeekyAnts** — June 2026–Present
2. 💡 **Innovation Ambassador** — 2025
3. 🎯 **Client Relations Specialist** — 2024–25
4. 💼 **Web Development Trainer** — 2024
5. 👥 **President - Design Thinking Society** — 2024–2025
6. 🎓 **B.E. Computer Science** — 2023–2027
