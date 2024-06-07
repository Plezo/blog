import { Pool } from "pg";
import { ColumnType, Generated, Kysely, PostgresDialect } from "kysely";

interface UsersTable {
  id: Generated<string>;
  email: string;
  userName: string;
  userImage: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

interface BlogsTable {
  id: Generated<string>;
  userID: string;
  uri: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  lastEditted: ColumnType<Date, string | undefined, never>;
}

export interface Database {
  users: UsersTable;
  blogs: BlogsTable;
}

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
