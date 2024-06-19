import axios from "axios";
import { Filter, Post, Posts, User, UserSinginRequest } from "./types";
import { NewPost } from "../types";
export const globalUrl = "https://localhost:7025";

export const url = `${globalUrl}/api/`;
export async function getCurrentUser() {
  const { data, status } = await axios.get<User>(
    `${url}Authenticate/getCurrentUser`
  );
  return data;
}

export async function login(user: UserSinginRequest) {
  try {
    const { data, status } = await axios.post<User>(
      `${url}Authenticate/login`,
      user
    );
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
  const _ = post.pictures.map((pic) => {
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
