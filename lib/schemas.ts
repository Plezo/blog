import { db, sql } from "@/lib/kysely";

export async function createUserTable() {
  await db.schema
    .createTable("user")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (cb) => cb.primaryKey())
    .execute();
}

export async function createBlogTable() {
  await db.schema
    .createTable("blog")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (cb) => cb.primaryKey())
    .execute();
}

export async function createAllTables() {
  await createUserTable();
  await createBlogTable();
}
