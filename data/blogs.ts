import { db, sql } from "@/lib/kysely";
import { NewBlog } from "@/lib/types";

export async function getAllBlogs() {
  const res = await db.selectFrom("blogs").selectAll("blogs").execute();

  return res;
}

export async function saveBlog(blog: NewBlog) {
  const test =
    await sql`SELECT * FROM information_schema.columns WHERE table_name='blogs'`.execute(
      db
    );

  console.log(test);

  return await db.insertInto("blogs").values(blog).execute();
}
