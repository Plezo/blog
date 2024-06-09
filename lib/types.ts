import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UsersTable;
  blogs: BlogsTable;
}

interface UsersTable {
  id: Generated<string>;
  email: string;
  userName: string;
  userImage: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface BlogsTable {
  id: Generated<string>;
  userID: string;
  uri: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  lastEdited: ColumnType<Date, string | undefined, never>;
}

export type Blog = Selectable<BlogsTable>;
export type NewBlog = Insertable<BlogsTable>;
export type BlogUpdate = Updateable<BlogsTable>;
