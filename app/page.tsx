import SingleBlog from "@/components/SingleBlog";
import { Separator } from "@/components/ui/separator";
import { getAllBlogs } from "@/data/blogs";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="flex flex-col">
      <div className="flex justify-center my-16">
        <h1 className="text-3xl font-semibold">Blogs</h1>
      </div>
      <div className="flex flex-col items-center">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col w-160">
            <SingleBlog blog={blog} />
            <div className="flex justify-center">
              <Separator className="my-6 w-11/12 opacity-25" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
