"use client";

import { CodeBlock, Pre } from "@/components/Code";
import { Blog } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
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
    <div className="flex flex-col mx-4">
      <div className="flex flex-col m-auto pt-4 gap-4">
        <h1 className="text-4xl font-bold text-foreground">
          {metadata?.title}
        </h1>
        <p>{metadata?.overview}</p>
        <p className="text-foreground">Author info here</p>
        <p>{metadata?.createdat}</p>
        <div className="flex justify-center h-96 my-4 overflow-hidden relative w-full">
          {metadata?.img && (
            <Image
              src={metadata.img}
              layout="fill"
              objectFit="cover"
              alt=""
              className="object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex justify-start">
        <div className="flex justify-center py-4 text-left w-144 m-auto">
          <Markdown
            className="prose prose-invert prose-p:text-xl text-foreground markdown"
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
      </div>
      <div className="flex justify-start">
        <h1 className="text-3xl font-bold text-foreground">Written by</h1>
      </div>
    </div>
  );
}
