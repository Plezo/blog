import { db, sql } from "@/lib/kysely";

export async function createBlogsTable() {
  await db.schema
    .createTable("blogs")
    .ifNotExists()
    .addColumn("id", "uuid", (cb) =>
      cb.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userid", "uuid", (cb) => cb.notNull())
    .addColumn("uri", "text", (cb) => cb.notNull())
    .addColumn("createdAt", "timestamptz", (cb) =>
      cb.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn("lastEdited", "timestamptz", (cb) =>
      cb.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}
