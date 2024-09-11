import { subscribeTypes } from "../constants/subscribeTypes";
import { ImageType } from "../types";

export type User = {
  id: number;
  name: string;
  token: string;
  email: string;
  languageId: number;
  locationId: number;
  login: string;
  pictureUrl: string;
  surname: string;
  telegram: string;
  userRating: number;
  userSubscribes: subscribeTypes[]
};

export type UserSlim = {
  name: string;
  login: string;
  surname: string;
  pictureUrl: string;
};

export type CreateUserRequest = {
  id: number;
  name: string;
  email: string;
  languageId: number;
  locationId: number;
  login: string;
  picture: ImageType | null;
  pictureUrl: string;
  surname: string;
  telegram: string;
  password: string;
  subscribe: subscribeTypes[]
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

export type Comment = {
  id: number;
  userId: number;
  fromUserId: number;
  postId: number;
  isRead: Boolean;
  isPrivate: Boolean;
  created: Date;
  parentCommentId: number | null;
  value: String;
  valueTranslationId: number | null;
  childrenCount: number;
  login: string;
  name: string;
  pictureUrl: string;
  surname: string;
};
