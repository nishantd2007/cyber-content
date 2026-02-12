import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Topic, TopicMetadata } from "@/types";

const contentDirectory = path.join(process.cwd(), "content");

// Helper to get clean text for the card description
function getCleanExcerpt(text: string): string {
  if (!text) return "";
  return (
    text
      .split("\n")
      .filter(
        (line) =>
          line.trim().length > 0 &&
          !line.toLowerCase().includes("word count") &&
          !line.toLowerCase().includes("reading time"),
      )
      .join(" ")
      .replace(/[#*`]/g, "")
      .substring(0, 140) + "..."
  );
}

export function getAllTopics(): TopicMetadata[] {
  if (!fs.existsSync(contentDirectory)) return [];

  // Read the directory for Topic folders (Topic-01, Topic-02, etc)
  const folders = fs
    .readdirSync(contentDirectory)
    .filter((f) => f.startsWith("Topic-"));

  return folders
    .map((folder) => {
      const number = parseInt(folder.split("-")[1]);
      // We assume there's a title in the Medium file or we use the folder name
      return {
        slug: folder,
        number: number,
        title: folder.replace("-", " "),
      };
    })
    .sort((a, b) => a.number - b.number);
}

export function getTopicBySlug(slug: string): Topic | null {
  try {
    const topicPath = path.join(contentDirectory, slug);

    // Read individual files
    const xContent = fs.readFileSync(path.join(topicPath, "X.md"), "utf8");
    const liContent = fs.readFileSync(path.join(topicPath, "LI.md"), "utf8");
    const meContent = fs.readFileSync(path.join(topicPath, "ME.md"), "utf8");

    // Use gray-matter to extract title from the Medium post frontmatter if available
    const { data: meData, content: meBody } = matter(meContent);
    const { content: liBody } = matter(liContent);
    const { content: xBody } = matter(xContent);

    const title = meData.title || slug.replace("-", " ");
    const number = parseInt(slug.split("-")[1]);

    return {
      slug,
      number,
      title,
      excerpt: getCleanExcerpt(liBody),
      image: `/images/topic-${number.toString().padStart(2, "0")}.png`,
      twitter: {
        content: xBody.trim(),
        charCount: xBody.trim().length,
      },
      linkedin: {
        content: liBody.trim(),
        wordCount: liBody.split(/\s+/).length,
      },
      medium: {
        content: meBody.trim(),
        wordCount: meBody.split(/\s+/).length,
      },
    };
  } catch (error) {
    console.error(`Error loading ${slug}:`, error);
    return null;
  }
}
