"use client";

import { CodeBlock, Pre } from "@/components/Code";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type FormError = {
  title?: string;
  overview?: string;
  content?: string;
  file?: string;
};

export default function Home() {
  const options = { code: CodeBlock, pre: Pre };
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [img, setImg] = useState<File | null>(null);
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

    if (img) {
      // 5mb limit
      if (img.size > 5e6) errors.file = "File size is too large!";
      else if (img.type.split("/")[0] !== "image")
        errors.file = "File must be an image!";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImg(file);
    }
  };

  const handlePublish = async () => {
    await validateForm();

    if (!isFormValid) {
      return console.error("Form is invalid");
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("overview", overview);
    formData.append("content", content);
    formData.append("userid", user?.id!);
    if (img) formData.append("imginput", img);

    try {
      const res = await axios.post("/api/publish", formData);

      if (res.status !== 200) {
        console.error("Failed to send POST request", res);
      }
    } catch (error) {
      if (error) return console.error(error);
    }

    setContent("");
    setTitle("");
    setOverview("");
    setImg(null);
    setErrors({});
    setIsFormValid(false);
  };

  return (
    <div className="p-12">
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
        <div className="flex flex-col gap-4 w-64">
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {errors.file && <p className="text-red-700">{errors.file}</p>}
          <button
            className="text-yellow-300 text-2xl bg-black p-2 mb-4 rounded-lg hover:bg-gray-900 active:bg-gray-800"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
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
              className="prose prose-invert min-w-full prose-p:text-xl markdown"
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
