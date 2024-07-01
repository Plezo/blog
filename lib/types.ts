export interface User {
  id: string;
  email: string;
  username: string;
  img: string;
  createdat: string; // consider string | Date
}

export type NewUser = Omit<User, "createdat">;
export type UpdateUser = Partial<User>;

export interface Blog {
  id: string;
  userid: string;
  uri: string;
  title: string;
  overview: string;
  img?: string;
  createdat: string; // consider string | Date
  lastedited: string; // consider string | Date
}

export type NewBlog = Omit<Blog, "createdat" | "lastedited">;
export type UpdateBlog = Partial<Blog>;

export type BlogPreview = Blog & { username?: string; userimg?: string };
