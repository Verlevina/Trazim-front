import axios from "axios";
import {
  CreateUserRequest,
  Filter,
  Post,
  Posts,
  User,
  UserSinginRequest,
  Comment,
} from "./types";
import { NewPost } from "../types";
import { hidePassword } from "../utils/utils";
import { subscribeTypes } from "../constants/subscribeTypes";

export const pureUrl = "localhost:7025";
export const globalUrl = `https://${pureUrl}`;

export const url = `${globalUrl}/api/`;
export async function getCurrentUser() {
  const { data } = await axios.get<User>(`${url}Authenticate/getCurrentUser`);
  return data;
}

export async function createUserRequest(user: CreateUserRequest) {
  let data = new FormData();
  user.password = hidePassword(user.password);
  if (user.picture !== null) {
    data.append(
      `file-${user.picture?.fileName}`,
      user.picture?.file,
      user.picture?.fileName
    );
  }
  data.append("name", user.name);
  data.append("surname", user.surname);
  data.append("telegram", user.telegram);
  data.append("password", user.password);
  data.append("email", user.email);
  data.append("languageId", (user.languageId + 1).toString());
  data.append("login", user.login);

  const response = await axios.post<number>(`${url}authenticate/new`, data, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
    },
  });

  return response.data;
}

export async function updateUserRequest(user: CreateUserRequest) {
  let data = new FormData();
  if (user.picture !== null && user.picture !== undefined) {
    data.append(
      `file-${user.picture?.fileName}`,
      user.picture?.file,
      user.picture?.fileName
    );
  }
  data.append("name", user.name);
  data.append("surname", user.surname);
  data.append("telegram", user.telegram);
  data.append(
    "telegramSubscribing",
    `${user.subscribe.indexOf(subscribeTypes.telegram) >= 0}`
  );
  data.append("email", user.email);
  data.append(
    "emailSubscribing",
    `${user.subscribe.indexOf(subscribeTypes.email) >= 0}`
  );
  data.append("languageId", (user.languageId + 1).toString());
  data.append("login", user.login);

  const response = await axios.post(`${url}authenticate/update`, data, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
    },
  });

  return response.data;
}

export async function login(user: UserSinginRequest) {
  try {
    user.password = hidePassword(user.password);
    const { data } = await axios.post<User>(`${url}Authenticate/login`, user);
    setJWTToken(data.token);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
}

export async function setJWTToken(token: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function deleteAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

export async function getPosts(filter: Filter) {
  try {
    const { data } = await axios.post<Posts>(`${url}post/search`, filter);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
}

export async function addPost(post: NewPost) {
  let data = new FormData();
  post.pictures.map((pic) => {
    return data.append(`file-${pic.fileName}`, pic.file, pic.fileName);
  });
  data.append("title", post.title);
  data.append("description", post.description);

  const response = await axios.post<number>(`${url}post/new`, data, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
    },
  });

  return response.data;
}

export async function getPostInfo(id: number) {
  const responce = await axios.get<Post>(`${url}post\\${id}`);
  return responce.data;
}

export async function getComments(postId: number, commentId: number | null) {
  const responce = await axios.get<Comment[]>(
    `${url}chat/search?postId=${postId}&commentId=${commentId}`
  );
  return responce.data;
}

export async function addMessage(
  message: string,
  parentId: number | null,
  postId: number
) {
  const responce = await axios.post<number>(`${url}chat/new`, {
    value: message,
    parentCommentId: parentId,
    postId: postId,
  });
  return responce.data;
}
