"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, ArrowUpRight, Loader2 } from "lucide-react";

type FeedCardProps = {
  embedUrl: string;
  postUrl: string;
  index?: number;
  height?: string; // Optional custom height override
};

const FeedCard: React.FC<FeedCardProps> = ({
  embedUrl,
  postUrl,
  index = 0,
  height = "h-[620px] sm:h-[700px]",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <article className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/80 bg-card/85 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-foreground/25 hover:shadow-lg">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] dark:bg-[#0A66C2]/20 dark:text-[#388be0]">
              <Linkedin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
                Verified Update
              </p>
              <p className="text-xs font-semibold text-foreground">Garvit Chawla</p>
            </div>
          </div>

          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
          >
            <span>View post</span>
            <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
        </div>

        {/* Frame Canvas with Fallback Loader */}
        <div className={`relative w-full overflow-hidden bg-background ${height}`}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/30 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground/70" />
              <span className="text-xs font-mono font-medium">Fetching LinkedIn stream...</span>
            </div>
          )}

          <iframe
            src={embedUrl}
            title={`LinkedIn publication entry ${index + 1}`}
            className="w-full h-full border-0"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            allow="encrypted-media; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </article>
    </motion.div>
  );
};

export default FeedCard;
