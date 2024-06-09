import { Pool } from "pg";
import { ColumnType, Generated, Kysely, PostgresDialect } from "kysely";
import { Database } from "@/lib/types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
export { sql } from "kysely";
