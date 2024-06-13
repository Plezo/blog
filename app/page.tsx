"use client";

import { CodeBlock, Pre } from "@/components/Code";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type FormError = {
  title?: string;
  overview?: string;
  content?: string;
};

export default function Home() {
  const options = { code: CodeBlock, pre: Pre };
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [img, setImg] = useState("");
  const [errors, setErrors] = useState<FormError>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const user = useUser();

  const feedElement = (syntax: string) => {
    return setContent(content + syntax);
  };

  const data = {
    lines: content.split(/\r\n|\r|\n/).length,
    words: content.split(/\s+/).filter(Boolean).length,
    characters: content.length,
  };

  const validateForm = () => {
    let errors: FormError = {};

    if (!title) {
      errors.title = "Title is required.";
    } else if (title.length < 4 || title.length > 64) {
      errors.title = "Title must have between 4 and 64 characters";
    }

    if (!overview) {
      errors.overview = "Overview is required.";
    } else if (overview.length < 10 || overview.length > 128) {
      errors.overview = "Overview must have between 10 and 128 characters";
    }

    if (!content) {
      errors.content = "Blog can't be empty!";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handlePublish = async () => {
    await validateForm();

    if (!isFormValid) {
      return console.error("Form is invalid");
    }

    try {
      const res = await axios.post(
        "/api/publish",
        {
          content: content,
          userid: user?.id,
          title: title,
          overview: overview,
          img: img === "" ? null : img,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 200) {
        console.error("Failed to send POST request", res);
      }
    } catch (error) {
      if (error) return console.error(error);
    }
  };

  return (
    <div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-4 w-32 text-black">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-700">{errors.title}</p>}
          <textarea
            placeholder="Overview"
            onChange={(e) => setOverview(e.target.value)}
          />
          {errors.overview && <p className="text-red-700">{errors.overview}</p>}
        </div>
        <button
          className="text-yellow-300 text-4xl bg-black p-4 rounded-full hover:bg-gray-900 active:bg-gray-800"
          onClick={handlePublish}
        >
          Publish
        </button>
        {isFormValid && (
          <h1 className="text-4xl text-green-600 p-4">Published!</h1>
        )}
      </div>
      <div>
        <Header feedElement={feedElement} />

        <main className="flex justify-between">
          <section className="w-full pt-5">
            {errors.content && <p className="text-red-700">{errors.content}</p>}
            <textarea
              className="w-full bg-transparent h-full resize-none 
            focus:outline-none placeholder:tracking-wider
            placeholder:text-lg placeholder:text-white 
            placeholder:opacity-80"
              placeholder="Write some markdown here!"
              value={content}
              rows={15}
              onChange={(e) => setContent(e.target.value)}
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
                [
                  rehypeExternalLinks,
                  { content: { type: "text", value: "🔗" } },
                ],
              ]}
            >
              {content}
            </Markdown>
          </article>
        </main>

        <Footer data={data} />
      </div>
    </div>
  );
}
