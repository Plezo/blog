import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogByID } from "@/data/blogs";
import { fetchObject } from "@/lib/aws/s3";
import Metadata from "./Metadata";
import { useMDXComponents } from "@/components/mdx-components";

export default async function BlogPage({
  params,
}: {
  params: { blogid: string };
}) {
  const blog = await getBlogByID(params.blogid);
  const blogcontent = await fetchObject(`blogs/${params.blogid!}.mdx`);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mx-4 my-16 w-192">
        <Metadata metadata={blog} />
        <main className="flex justify-center py-4 text-left m-auto">
          <article className="prose prose-invert prose-p:text-xl text-foreground markdown">
            <MDXRemote
              source={blogcontent.Body as string}
              components={useMDXComponents({})}
            />
          </article>
        </main>
      </div>
    </div>
  );
}
