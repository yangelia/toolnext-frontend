// types\user.ts

export interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPublic {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
}
