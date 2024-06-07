import { db } from "@/lib/kysely";

export async function getAllBlogs() {
  const res = await db.selectFrom("blogs").selectAll("blogs").execute();

  return res;
}
