"use client";

import { CodeBlock, Pre } from "@/components/Code";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export default function Home() {
  const options = { code: CodeBlock, pre: Pre };
  const [source, setSource] = useState("");

  const feedElement = (syntax: string) => {
    return setSource(source + syntax);
  };

  const data = {
    lines: source.split(/\r\n|\r|\n/).length,
    words: source.split(/\s+/).filter(Boolean).length,
    characters: source.length,
  };

  return (
    <>
      <Header feedElement={feedElement} />

      <main className="flex justify-between">
        <section className="w-full pt-5">
          <textarea
            className="w-full bg-transparent h-full resize-none 
            focus:outline-none placeholder:tracking-wider
            placeholder:text-lg placeholder:text-white 
            placeholder:opacity-80"
            placeholder="Write some markdown here!"
            value={source}
            rows={15}
            onChange={(e) => setSource(e.target.value)}
          />
        </section>

        <div className="fixed left-1/2 w-[2px] h-full border-2 border-yellow-600 border-dashed" />

        <article className="w-full pt-5 pl-6">
          <Markdown
            className="prose prose-invert min-w-full prose-p:text-xl"
            components={options}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSanitize,
              [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
            ]}
          >
            {source}
          </Markdown>
        </article>
      </main>

      <Footer data={data} />
    </>
  );
}
