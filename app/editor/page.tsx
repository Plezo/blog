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
import WordCount from "./WordCount";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import { useMDXComponents } from "@/components/mdx-components";

const PreviewMDX = dynamic(() => import("./PreviewMDX"), { ssr: false });

type FormError = {
  title?: string;
  overview?: string;
  content?: string;
  file?: string;
};

type ImgData = {
  file: File;
  uri?: string;
};

export default function Editor() {
  //   const options = { code: CodeBlock, pre: Pre };
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [img, setImg] = useState<File | undefined>(undefined);
  const [imgs, setImgs] = useState<ImgData[]>([]);
  const [errors, setErrors] = useState<FormError>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const user = useUser();

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
      Array.from(e.target.files).forEach(async (file) => {
        const formData = new FormData();
        formData.append("img", file);

        const res = await axios.post("/api/file", formData);

        const imgdata: ImgData = {
          file: file,
          uri: res.data.imguri,
        };

        setImgs([...imgs, imgdata]);
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
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
    setImg(undefined);
    setErrors({});
    setIsFormValid(false);
  };

  return (
    <div className="p-12 h-screen">
      <form className="flex gap-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4 w-64 text-black">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-700">{errors.title}</p>}
          <textarea
            placeholder="Overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
          {errors.overview && <p className="text-red-700">{errors.overview}</p>}
        </div>
        <div className="flex flex-col gap-4 w-64">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileUpload(e);
              setImg(imgs!.at(-1)?.file);
            }}
          />
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
      </form>
      <div className="flex flex-col w-full bg-black h-72 p-8 gap-4">
        <input
          className="text-black w-32"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <div className="flex gap-4">
          {imgs.map((imgUpload) => (
            <Image
              className="hover:opacity-90 active:opacity-75 aspect-[1/1]"
              src={imgUpload.uri!}
              width={150}
              height={150}
              alt=""
              onClick={() => {
                copyToClipboard(imgUpload.uri!);
                toast({
                  title: "Saved to clipboard",
                  description: imgUpload.uri!,
                });
              }}
            />
          ))}
        </div>
      </div>

      <div className="h-full">
        {/* <Header feedElement={feedElement} /> */}

        <WordCount data={data} />
        <main className="flex justify-between h-full">
          <section className="w-full p-8">
            {errors.content && <p className="text-red-700">{errors.content}</p>}
            <textarea
              className="w-full bg-transparent h-full resize-none 
            focus:outline-none placeholder:tracking-wider
            placeholder:text-lg placeholder:text-white 
            placeholder:opacity-80"
              placeholder="Write some markdown here!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </section>

          <article className="bg-gray-600 w-full p-8 prose prose-invert prose-p:text-xl text-foreground markdown">
            <PreviewMDX source={content} components={useMDXComponents({})} />
          </article>
        </main>
      </div>
    </div>
  );
}
