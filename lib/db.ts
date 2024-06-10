import { Pool } from "pg";

const createPool = () => {
  return new Pool({
    database: process.env.POSTGRES_DB!,
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    port: Number(process.env.POSTGRES_PORT!),
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

export const query = async (text: string, params?: any[]) => {
  const pool = createPool();

  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Query error", error);
    throw new Error("Database query error");
  } finally {
    await pool.end();
  }
};

export default query;
