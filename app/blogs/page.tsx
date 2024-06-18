"use client";
import { Blog } from "@/lib/types";
import SingleBlog from "@/components/Blog";
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      {blogs.map((blog) => (
        <SingleBlog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
