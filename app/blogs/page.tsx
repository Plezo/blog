"use client";
import { BlogPreview } from "@/lib/types";
import SingleBlog from "@/components/SingleBlog";
import axios from "axios";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`/api/blog`);
        setBlogs(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <main className="flex flex-col">
      <div className="flex justify-center my-16">
        <h1 className="text-3xl font-semibold">Blogs</h1>
      </div>
      <div className="flex flex-col items-center">
        {blogs.map((blog) => (
          <div className="flex flex-col w-160">
            <SingleBlog key={blog.id} blog={blog} />
            <div className="flex justify-center">
              <Separator className="my-6 w-11/12 opacity-25" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
