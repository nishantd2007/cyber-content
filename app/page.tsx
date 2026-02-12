import { getAllTopics, getTopicBySlug } from "@/lib/markdown";
import ClientPageContent from "../components/ClientPageContent";
import type { Topic } from "@/types";

export default function Home() {
  // This code runs ONLY on the server
  const topicMetadata = getAllTopics();
  const topics = topicMetadata
    .map((meta) => getTopicBySlug(meta.slug))
    .filter((topic): topic is Topic => topic !== null);

  // We pass the data across the "Network Boundary" to the Client Component
  return <ClientPageContent topics={topics} />;
}
