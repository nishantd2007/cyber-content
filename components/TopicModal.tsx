// components/TopicModal.tsx
"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { X, Twitter, Linkedin, FileText } from "lucide-react";
import type { Topic } from "@/types";

export default function TopicModal({
  topic,
  isOpen,
  onClose,
}: {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"twitter" | "linkedin" | "medium">(
    "twitter",
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab("twitter");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, topic?.slug]);

  if (!isOpen || !topic) return null;

  const currentRawContent = topic[activeTab]?.content ?? "";

  const displayContent = currentRawContent
    .split("\n")
    .filter((line) => {
      const l = line.toLowerCase();
      return !l.includes("word count") && !l.includes("reading time");
    })
    .join("\n")
    .trim();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-all duration-500"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 sticky top-0 z-10 transition-colors duration-500">
          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Topic {topic.number}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-zinc-100 leading-tight transition-colors duration-500">
              {String(topic.title)
                .replace(/^topic\s*[-_#]?\s*\d+\s*[-_:]?\s*/i, "")
                .replace(/_/g, " ")
                .replace(/\s+/g, " ")
                .trim()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-400 dark:text-zinc-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50/50 dark:bg-zinc-800/40 px-6 border-b border-gray-100 dark:border-zinc-800 transition-colors duration-500">
          {(["twitter", "linkedin", "medium"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab
                  ? "border-black dark:border-zinc-100 text-black dark:text-zinc-100"
                  : "border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
              }`}
            >
              {tab === "twitter" ? (
                <Twitter size={14} />
              ) : tab === "linkedin" ? (
                <Linkedin size={14} />
              ) : (
                <FileText size={14} />
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-7 custom-scrollbar bg-white dark:bg-zinc-900 transition-colors duration-500">
          {!displayContent ? (
            <div className="py-20 text-center text-gray-300 dark:text-zinc-600 italic">
              Content pending...
            </div>
          ) : (
            /* 1. Added dark:prose-invert to flip all typography colors.
       2. Explicitly added prose-headings:dark:text-zinc-100 to override the black color 
          you see in your Medium content screenshots.
    */
            <article
              className="prose max-w-none 
      prose-slate 
      dark:prose-invert 
      prose-headings:font-bold 
      prose-headings:text-gray-900 
      dark:prose-headings:text-zinc-100 
      prose-p:text-gray-800 
      dark:prose-p:text-zinc-300 
      prose-li:text-gray-800 
      dark:prose-li:text-zinc-300 
      prose-strong:text-gray-900 
      dark:prose-strong:text-zinc-100 
      transition-colors duration-500"
            >
              <ReactMarkdown
                components={{
                  pre: ({ children }) => (
                    <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 text-sm text-gray-800 dark:text-zinc-300 font-mono leading-relaxed transition-colors duration-500">
                      {children}
                    </pre>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm text-gray-900 dark:text-zinc-200 transition-colors duration-500">
                      {children}
                    </code>
                  ),
                }}
              >
                {displayContent}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
