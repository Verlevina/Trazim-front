import { ImageType } from "../types";

export type User = {
  id: number;
  name: string;
  token: string;
  email: string;
  languageId: string;
  locationId: number;
  login: string;
  pictureUrl: string;
  surname: string;
  telegram: string;
  userRating: number;
};

export type UserSlim = {
  name: string;
  login: string;
  surname: string;
  pictureUrl: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  languageId: number;
  locationId: number;
  login: string;
  picture: ImageType | null;
  surname: string;
  telegram: string;
  password: string;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  owner: User | null;
  pictureUrls: string[];
  user: UserSlim;
  created: Date;
};

export type Posts = {
  posts: Post[];
  page: number;
  pageCount: number;
};

export type Filter = {
  id: number | null;
  title: string | null;
  originalLanguageId: number | null;
  pictureExisting: boolean | null;
  locationId: number | null;
  isArchived: boolean | null;
  userId: number | null;

  // Paging
  pageNumber: number;
  pageSize: number;

  // Ordering
  orderBy: string | null;
  orderDescending: boolean | null;
};

export type UserSinginRequest = {
  email: string;
  password: string;
};
