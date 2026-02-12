'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Topic } from '@/types';

interface TopicAccordionProps {
  topic: Topic;
}

export default function TopicAccordion({ topic }: TopicAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden mb-4">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-semibold min-w-[60px]">
            TOPIC {topic.number}
          </span>
          <h2 className="text-base font-semibold text-left">{topic.title}</h2>
        </div>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="border-t border-border p-6 space-y-6">
          {/* X/Twitter */}
          <PlatformSection
            icon="📱"
            name="X (Twitter)"
            meta={`${topic.twitter.charCount}/280`}
            content={topic.twitter.content}
            onCopy={() => copyToClipboard(topic.twitter.content, `twitter-${topic.number}`)}
            copied={copiedId === `twitter-${topic.number}`}
          />

          {/* LinkedIn */}
          <PlatformSection
            icon="💼"
            name="LinkedIn"
            meta={`${topic.linkedin.wordCount} words`}
            content={topic.linkedin.content}
            onCopy={() => copyToClipboard(topic.linkedin.content, `linkedin-${topic.number}`)}
            copied={copiedId === `linkedin-${topic.number}`}
          />

          {/* Medium */}
          <PlatformSection
            icon="📝"
            name="Medium"
            meta={`${topic.medium.wordCount} words`}
            content={topic.medium.content}
            onCopy={() => copyToClipboard(topic.medium.content, `medium-${topic.number}`)}
            copied={copiedId === `medium-${topic.number}`}
            markdown
          />
        </div>
      )}
    </div>
  );
}

interface PlatformSectionProps {
  icon: string;
  name: string;
  meta: string;
  content: string;
  onCopy: () => void;
  copied: boolean;
  markdown?: boolean;
}

function PlatformSection({
  icon,
  name,
  meta,
  content,
  onCopy,
  copied,
  markdown = false,
}: PlatformSectionProps) {
  return (
    <div className="pb-6 border-b border-border last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>{icon}</span>
          <span>{name}</span>
          <span className="text-xs text-muted-foreground font-medium">{meta}</span>
        </div>
        <button
          onClick={onCopy}
          className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
            copied
              ? 'border-blue-500 text-blue-500'
              : 'border-border text-muted-foreground hover:bg-secondary'
          }`}
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <div className="bg-secondary border border-border rounded-lg p-4">
        {markdown ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
