import query from "@/lib/db";
import { NewBlog, UpdateBlog } from "@/lib/types";

export async function saveBlog(blog: NewBlog) {
  const q = `
  INSERT INTO blogs (id, userid, uri, title, overview, img)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;

  const values = [
    blog.id,
    blog.userid,
    blog.uri,
    blog.title,
    blog.overview,
    blog.img,
  ];
  const res = await query(q, values);
  return res.rows[0];
}

export const getAllBlogs = async () => {
  const q = `
  SELECT * FROM blogs
  `;

  const res = await query(q);
  return res.rows;
};

export const getBlogByID = async (id: string) => {
  const q = `
  SELECT * FROM blogs WHERE id = $1
  `;

  const values = [id];
  const res = await query(q, values);
  return res.rows[0];
};

export const updateBlog = async (id: string, update: UpdateBlog) => {
  const q = `
  UPDATE blogs
  SET uri = COALESCE($1, url),
    lastEdited = CURRENT_TIMESTAMP
  WHERE id = $2
  RETURNING *;
  `;

  const values = [update.uri, id];
  const res = await query(q, values);
  return res.rows[0];
};

export const deleteBlog = async (id: string) => {
  const q = `
  DELETE FROM blogs WHERE id = $1 RETURNING *
  `;

  const values = [id];
  const res = await query(q, values);
  return res.rows[0];
};
