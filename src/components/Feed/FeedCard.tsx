import React from "react";
import { motion } from "framer-motion";

type FeedCardProps = {
  embedUrl: string;
  postUrl: string;
  index?: number;
};

const FeedCard: React.FC<FeedCardProps> = ({ embedUrl, postUrl, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      <article className="overflow-hidden rounded-3xl border border-white/10 dark:border-white/5 bg-white/55 dark:bg-slate-950/55 backdrop-blur-xl shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-22px_rgba(0,0,0,0.42)]">
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">LinkedIn post</p>
            <p className="text-sm text-foreground/80">Garvit Chawla</p>
          </div>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-primary hover:underline"
          >
            Open on LinkedIn
          </a>
        </div>

        <div className="w-full overflow-hidden bg-background border-t border-border/40">
          <iframe
            src={embedUrl}
            title={`LinkedIn post ${index + 1}`}
            className="w-full h-[920px] md:h-[980px] lg:h-[1040px] border-0"
            loading="lazy"
            allow="encrypted-media; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </article>
    </motion.div>
  );
};

export default FeedCard;
