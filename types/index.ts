export interface Topic {
  slug: string;
  number: number;
  title: string;
  excerpt: string;
  image: string;
  twitter: {
    content: string;
    charCount: number;
  };
  linkedin: {
    content: string;
    wordCount: number;
  };
  medium: {
    content: string;
    wordCount: number;
  };
}

export interface TopicMetadata {
  number: number;
  title: string;
  slug: string;
}
