import query from "@/lib/db";
import { NewUser, UpdateUser, User } from "@/lib/types";

export async function createUser(user: NewUser) {
  const q = `
  INSERT INTO users (id, email, username, img)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;

  const values = [user.id, user.email, user.username, user.img];
  const res = await query(q, values);
  return res.rows[0];
}

export const getUserByID = async (id: string) => {
  const q = `
  SELECT * FROM users WHERE id = $1
  `;

  const values = [id];
  const res = await query(q, values);
  return res.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const q = `
  SELECT * FROM users WHERE email = $1
  `;

  const values = [email];
  const res = await query(q, values);
  return res.rows[0];
};

export const getUserByUsername = async (username: string) => {
  const q = `
  SELECT * FROM users WHERE username = $1
  `;

  const values = [username];
  const res = await query(q, values);
  return res.rows[0];
};
