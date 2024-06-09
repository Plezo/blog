import { db, sql } from "@/lib/kysely";
import { NewBlog } from "@/lib/types";

export async function getAllBlogs() {
  const res = await db.selectFrom("blogs").selectAll("blogs").execute();

  return res;
}

export async function saveBlog(blog: NewBlog) {
  const res = await db
    .insertInto("blogs")
    .values({
      id: blog.id,
      userid: blog.userid,
      uri: blog.uri,
    })
    .execute();

  return res;
}
