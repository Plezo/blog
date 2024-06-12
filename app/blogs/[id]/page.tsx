"use client";
import { CodeBlock, Pre } from "@/components/Code";
import { Blog } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export default function BlogPage({ params }: { params: { blogid: string } }) {
  const options = { code: CodeBlock, pre: Pre };
  const [metadata, setMetadata] = useState<Blog | null>(null);
  const [content, setContent] = useState(" ");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: blog } = await axios.get(
          `/api/blog?blogid=${params.blogid}`
        );

        setMetadata(blog.metadata as Blog);
        setContent(blog.content as string);
      } catch (error) {
        console.error("Failed to fetch blog", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <Markdown
        className="prose prose-invert min-w-full prose-p:text-xl"
        components={options}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSanitize,
          [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
        ]}
      >
        {content}
      </Markdown>
    </div>
  );
}
