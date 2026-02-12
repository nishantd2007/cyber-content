"use client";

import { useState } from "react";
import type { Topic } from "@/types";
import TopicCard from "@/components/TopicCard";
import TopicModal from "@/components/TopicModal";
import ThemeToggle from "./ThemeToggle";

interface ClientPageContentProps {
  topics: Topic[];
}

export default function ClientPageContent({ topics }: ClientPageContentProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Theme Toggle in the top right */}
      <ThemeToggle />

      <main className="w-full max-w-[1600px] flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8 justify-center w-full">
          {topics.map((topic) => (
            <div key={topic.slug} className="flex justify-center">
              <TopicCard topic={topic} onClick={(t) => setSelectedTopic(t)} />
            </div>
          ))}
        </div>
      </main>

      {/* Detail Modal */}
      <TopicModal
        topic={selectedTopic}
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
}
