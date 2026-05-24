import React from "react";
import FeedCard from "./FeedCard";

const LINKEDIN_POSTS = [
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_introduction-to-modern-ai-was-issued-by-cisco-activity-7445448911818997760-ZIiU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_nutanix-certified-associate-6-was-issued-activity-7439274337024749568-ck4s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_garvit-chawla-innovation-ambassador-chitkara-activity-7381732308002938880-WF9n?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_render-a-creative-innovation-a-grand-sucess-activity-7357160054204108800-6cQ-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
  "https://www.linkedin.com/posts/garvit-chawla-aba33a294_leadership-teamwork-ace2025-activity-7289306254550745089-4FrH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEc9oK4BE6smC10nPSqzQ7kBwzYh3OLBp-4",
];

const FeedSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 px-3 md:px-4">
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            Latest <span className="inline-block text-gradient">Updates</span>
          </h2>
          <p className="text-sm text-muted-foreground">Recent LinkedIn posts from Garvit Chawla</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LINKEDIN_POSTS.map((url, idx) => (
            <FeedCard key={url} embedUrl={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${url.match(/activity-(\d+)/)?.[1]}`} postUrl={url} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedSection;
