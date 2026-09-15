"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Github, Sparkles } from "lucide-react";
import Image from "next/image";

const GITHUB_USERNAME = "Garvit-office";

const GithubContributions = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border bg-background/60 backdrop-blur-md">
            <Github className="h-4 w-4" />
            <span className="text-sm font-medium">Coding Activity</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            GitHub <span className="inline-block text-gradient">Contributions</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            A real-time snapshot of my daily commitment to writing clean, scalable code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 md:p-8 rounded-3xl border bg-background/60 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center overflow-hidden">
            
            {/* Live Contribution Graph Widget */}
            <div className="w-full overflow-x-auto py-2 flex justify-center">
              {/* Using standard open-source GitHub contribution graph generator */}
              <img
                src={`https://ghchart.rshah.org/4f46e5/${GITHUB_USERNAME}`}
                alt={`${GITHUB_USERNAME}'s Github contribution graph`}
                className="w-full max-w-4xl h-auto rounded-xl dark:invert-[0.1] dark:hue-rotate-180"
                loading="lazy"
              />
            </div>

            {/* Quick stats link or footer info */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 w-full text-sm text-muted-foreground border-t pt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Updated in real-time from GitHub</span>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
              >
                View Profile &rarr;
              </a>
            </div>

          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributions;
