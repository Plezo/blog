"use client";
import { Blog } from "@/lib/types";
import SingleBlog from "@/components/Blog";
import axios from "axios";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`/api/blog`);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchContent();
  }, []);
  return (
    <main className="flex flex-col ">
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-semibold">Blogs</h1>
      </div>
      <div className="flex flex-col">
        {blogs.map((blog) => (
          <div className="w-full flex flex-col">
            <SingleBlog key={blog.id} blog={blog} />
            <div className="w-full flex justify-center">
              <Separator className="my-4 w-96  opacity-25" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
