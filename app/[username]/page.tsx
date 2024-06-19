"use client";

import { Blog, User } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(
          `/api/user?username=${params.username}&getblogs=true`
        );

        setProfile(data.profile);
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="flex flex-row justify-between">
      {/* List of blogs */}
      <div className="flex flex-col gap-4">
        <div>{profile?.username}</div>
        <div className="flex flex-col gap-8 bg-slate-800 p-4">
          {blogs.map((blog) => (
            <div className="flex flex-row gap-12">
              <div className="flex flex-col">
                <h1 className="text-2xl font-extrabold">{blog.title}</h1>
                <p>{blog.overview}</p>
                <p>{blog.createdat}</p>
              </div>

              {blog.img && (
                <Image src={blog.img} width={100} height={50} alt="" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Info */}
      <div>{profile?.username}</div>
    </div>
  );
}
