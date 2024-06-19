// Render the list of blogs
import { Blog } from "@/lib/types";
import Image from "next/image";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex flex-col gap-8 bg-slate-800 p-4">
      <a href={`/blogs/${blog.id}`}>
        <div className="flex flex-row gap-12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold">{blog.title}</h1>
            <p>{blog.overview}</p>
            <p>{blog.createdat}</p>
          </div>

          {blog.img && <Image src={blog.img} width={100} height={50} alt="" />}
        </div>
      </a>
    </div>
  );
};

export default SingleBlog;
