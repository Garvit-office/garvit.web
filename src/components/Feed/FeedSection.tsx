"use client";

import React, { useMemo } from "react";
import { Linkedin, Sparkles, ArrowUpRight } from "lucide-react";
import FeedCard from "./FeedCard";
import { Button } from "@/components/ui/button";

const LINKEDIN_POSTS = [
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_introduction-to-modern-ai-was-issued-by-cisco-activity-7445448911818997760-ZIiU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_nutanix-certified-associate-6-was-issued-activity-7439274337024749568-ck4s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_garvit-chawla-innovation-ambassador-chitkara-activity-7381732308002938880-WF9n?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_render-a-creative-innovation-a-grand-sucess-activity-7357160054204108800-6cQ-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_leadership-teamwork-ace2025-activity-7289306254550745089-4FrH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
];

export default function FeedSection() {
  // Extract activity IDs and compute valid embed URLs
  const posts = useMemo(() => {
    return LINKEDIN_POSTS.map((url) => {
      const match = url.match(/activity-(\d+)/);
      const activityId = match ? match[1] : null;

      return {
        postUrl: url,
        activityId,
        embedUrl: activityId
          ? `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
          : null,
      };
    }).filter(
      (item): item is { postUrl: string; activityId: string; embedUrl: string } =>
        Boolean(item.embedUrl)
    );
  }, []);

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 bg-muted/10">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Live Activity Stream
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Recent Field Insights & Publications
            </h2>
            
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Certifications, university innovation milestones, and technical briefings shared directly from LinkedIn.
            </p>
          </div>

          <a
            href="https://linkedin.com/in/garvit-chawla"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/80 bg-background/80 text-xs font-medium hover:bg-muted shadow-2xs group"
            >
              <Linkedin className="mr-2 h-3.5 w-3.5 text-[#0A66C2]" />
              Follow on LinkedIn
              <ArrowUpRight className="ml-1.5 h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Button>
          </a>
        </div>

        {/* Embed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((item, idx) => (
            <FeedCard
              key={item.activityId}
              embedUrl={item.embedUrl}
              postUrl={item.postUrl}
              index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
