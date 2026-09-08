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
"Supported project development and conducted innovation workshops at Chitkara University.",
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
"Managed communication and requirement gathering at Studio C.O.I.N.",
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
"Trained students in HTML, CSS, JavaScript, React, Node.js, and MongoDB at MJ Marketing.",
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
"Led design innovation activities and guided students in prototyping and creative problem-solving.",
image: presidentImg,
category: "Leadership",
color: "from-pink-400 to-pink-600",
bgGradient: "bg-gradient-to-br from-pink-100 to-pink-50",
},
{
year: "2023-2027",
icon: GraduationCap,
title: "B.E. Computer Science",
description:
"Pursuing a Bachelor of Engineering in Computer Science at Chitkara University Institute of Engineering and Technology.",
image: beChitkaraImg,
category: "Education",
color: "from-indigo-400 to-indigo-600",
bgGradient: "bg-gradient-to-br from-indigo-100 to-indigo-50",
},
];

return ( <div className="min-h-screen py-20 px-4"> <div className="container mx-auto max-w-4xl">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
> <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
My{" "} <span className="inline-block text-gradient">
Timeline </span> </h1>

```
      <p className="text-muted-foreground text-center mb-12 text-lg">
        Key milestones and achievements throughout my journey
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full" />

        <div className="space-y-8">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;

            return (
              <motion.div
                key={`${achievement.year}-${achievement.title}`}
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.5,
                }}
                className={`relative ${
                  idx % 2 === 0
                    ? "md:pr-[50%]"
                    : "md:pl-[50%]"
                }`}
              >
                {/* Timeline icon */}
                <div
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 md:translate-x-[-50%] w-16 h-16 glass border-4 border-white dark:border-gray-800 flex items-center justify-center rounded-full shadow-lg z-20"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  <div
                    className={`bg-gradient-to-br ${achievement.color} p-3 rounded-full`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Achievement card */}
                <Card
                  className={`glass p-6 ml-16 md:ml-0 rounded-3xl hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                    idx % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 ${achievement.bgGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`}
                  />

                  {/* Content */}
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
                            className="w-full h-40 md:h-32 lg:h-40 object-cover rounded-xl border border-white/10 dark:border-white/10"
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
                        {/* Year */}
                        <Badge className="mb-3 gradient-accent text-white border-0 rounded-full">
                          {achievement.year}
                        </Badge>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-2">
                          {achievement.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
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
            );
          })}
        </div>
      </div>
    </motion.div>
  </div>
</div>
```

);
};

export default Timeline;
