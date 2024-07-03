import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogByID } from "@/data/blogs";
import { fetchObject } from "@/lib/aws/s3";

export default async function BlogPage({
  params,
}: {
  params: { blogid: string };
}) {
  const blog = await getBlogByID(params.blogid);
  const blogcontent = await fetchObject(`blogs/${params.blogid!}.mdx`);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mx-4 my-16 w-144">
        <div className="flex flex-col m-auto gap-4">
          <h1 className="text-5xl font-bold text-foreground">{blog.title}</h1>
          <p className="text-xl text-gray-400">{blog.overview}</p>
          <div className="flex gap-4 w-16">
            <Image
              className="rounded-full h-full w-full"
              src={blog.userimg!}
              width={35}
              height={35}
              alt=""
            />
            <div className="flex flex-col m-auto">
              <span className="text-sm">{blog.username}</span>
              <p className="text-sm text-gray-300">
                {formatDate(new Date(blog.createdat))}
              </p>
            </div>
          </div>
          <div className="flex justify-center w-full overflow-hidden">
            {blog.img && (
              <Image
                className="w-full h-[500px] object-cover"
                src={blog.img}
                // fill={true}
                width={500}
                height={500}
                objectFit="contain"
                alt=""
              />
            )}
          </div>
        </div>
        <main className="flex justify-center py-4 text-left m-auto">
          <article className="prose prose-invert prose-p:text-xl text-foreground markdown">
            <MDXRemote source={blogcontent.Body as string} />
          </article>
        </main>
      </div>
    </div>
  );
}
