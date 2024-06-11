import query from "@/lib/db";
import { NewUser, UpdateUser } from "@/lib/types";

export async function createUser(user: NewUser) {
  const q = `
    INSERT INTO users (id, email, userName, userImage)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const values = [user.id, user.email, user.userName, user.userImage];
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
