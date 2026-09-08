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
import presidentImg from "@/assets/IMG_5407.jpg";
import geekyImg from "@/assets/IMG_1349.jpeg";

const Timeline = () => {
const achievements = [
{
year: "June 2026 - Present",
icon: Briefcase,
title: "Software Engineer - GeekyAnts",
description:
"Working as a Software Engineer at GeekyAnts, Bengaluru, contributing to software development and building scalable web applications.",
image: geekyImg,
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

return ( <div className="min-h-screen py-20 px-4"> <div className="container mx-auto max-w-5xl">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
> <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
My{" "} <span className="inline-block text-gradient">
Timeline </span> </h1>

```
      <p className="text-muted-foreground text-center mb-12 text-lg">
        Key milestones and achievements throughout my journey
      </p>

      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-accent to-secondary" />

        <div className="space-y-10">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${achievement.year}-${achievement.title}`}
                initial={{
                  opacity: 0,
                  x: isEven ? -40 : 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative"
              >
                {/* Timeline icon */}
                <div
                  className="absolute left-8 md:left-1/2 top-8 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  <div
                    className={`rounded-full bg-gradient-to-br ${achievement.color} p-2.5`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? "md:pr-10"
                      : "md:ml-auto md:pl-10"
                  }`}
                >
                  <Card className="glass group relative ml-16 overflow-hidden rounded-3xl p-6 shadow-md transition-all duration-300 hover:shadow-2xl md:ml-0">
                    {/* Hover background */}
                    <div
                      className={`pointer-events-none absolute inset-0 ${achievement.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-40`}
                    />

                    <div className="relative z-10">
                      <div className="flex flex-col gap-5 sm:flex-row">
                        {/* Image */}
                        <div className="w-full flex-shrink-0 sm:w-36">
                          <img
                            src={
                              typeof achievement.image === "string"
                                ? achievement.image
                                : achievement.image.src
                            }
                            alt={achievement.title}
                            loading="lazy"
                            className="h-40 w-full rounded-2xl border border-white/10 object-cover shadow-sm sm:h-36"
                          />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          {/* Year */}
                          <Badge className="gradient-accent mb-3 rounded-full border-0 text-white">
                            {achievement.year}
                          </Badge>

                          {/* Title */}
                          <h3 className="mb-2 text-xl font-bold leading-tight">
                            {achievement.title}
                          </h3>

                          {/* Description */}
                          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                            {achievement.description}
                          </p>

                          {/* Category */}
                          <Badge
                            variant="outline"
                            className="rounded-full text-xs"
                          >
                            {achievement.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
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
