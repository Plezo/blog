export interface User {
  id: string;
  email: string;
  userName: string;
  userImage: string;
  createdAt: string; // consider string | Date
}

export type NewUser = Omit<User, "createdAt">;
export type UpdateUser = Partial<User>;

export interface Blog {
  id: string;
  userID: string;
  uri: string;
  createdAt: string; // consider string | Date
  lastEdited: string; // consider string | Date
}

export type NewBlog = Omit<Blog, "createdAt" | "lastEdited">;
export type UpdateBlog = Partial<Blog>;
