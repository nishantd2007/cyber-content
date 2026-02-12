// components/TopicCard.tsx
"use client";

import type { Topic } from "@/types";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

export default function TopicCard({ topic, onClick }: TopicCardProps) {
  const cleanTitle = String(topic.title)
    .replace(/^topic\s*[-_#]?\s*\d+\s*[-_:]?\s*/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1">
      <div className="relative h-48 bg-gray-200 dark:bg-zinc-800 overflow-hidden">
        <img
          src={topic.image}
          alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/600x400?text=Security+Insight";
          }}
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-black dark:text-zinc-200 shadow-sm">
          Topic {topic.number.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-black dark:text-zinc-100 mb-3 leading-tight line-clamp-2 transition-colors duration-500">
          {cleanTitle}
        </h3>

        <p
          suppressHydrationWarning
          className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow transition-colors duration-500"
        >
          {topic.excerpt}
        </p>

        <button
          onClick={() => onClick(topic)}
          className="w-full bg-black dark:bg-zinc-100 text-white dark:text-black py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-white transition-all duration-300 active:scale-95"
        >
          Read Content
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
