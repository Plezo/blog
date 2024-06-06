import { Pool } from "pg";
import { ColumnType, Generated, Kysely, PostgresDialect } from "kysely";

interface UserTable {
  id: Generated<number>;
  name: string;
  email: string;
  image: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export interface Database {
  users: UserTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRESS_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
export { sql } from "kysely";
