// Render the list of blogs
import { Blog } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function SingleBlog({ blog }: { blog: Blog }) {
  return (
    <a href={`/blogs/${blog.id}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={blog.img!}
            width={25}
            height={25}
            alt=""
            className="aspect-[1/1] rounded-full"
          />
          <p className="text-xs opacity-90">{blog.userid}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-between gap-2 w-3/5">
            <h1 className="text-2xl font-extrabold">{blog.title}</h1>
            <p className="text-sm opacity-80">{blog.overview}</p>
            <p className="text-xs opacity-90 mt-4">
              {formatDate(new Date(blog.createdat))}
            </p>
          </div>
          {blog.img && (
            <Image
              src={blog.img}
              width={150}
              height={125}
              alt=""
              className="h-full aspect-[3/2]"
            />
          )}
        </div>
      </div>
    </a>
  );
}
