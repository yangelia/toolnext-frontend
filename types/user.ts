// types/user.ts

export interface User {
  _id: string;
  email: string;
  username?: string; // было string -> стало optional
  name?: string; // добавили
  avatar?: string;
  avatarUrl?: string; // добавили
  createdAt: string;
  updatedAt: string;
}

export interface UserPublic {
  _id: string;
  username?: string; // было string -> стало optional
  name?: string; // добавили
  avatar?: string;
  avatarUrl?: string; // добавили
  email: string;
  createdAt: string;
}
