import { getBlogsByUser } from "@/data/blogs";
import { getUserByUsername } from "@/data/users";
import Image from "next/image";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getUserByUsername(params.username);
  const blogs = await getBlogsByUser(profile.id);

  console.log(profile);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-4">
        <div>{profile?.username}</div>
        <div className="flex flex-col gap-8 bg-slate-800 p-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex flex-row gap-12">
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
