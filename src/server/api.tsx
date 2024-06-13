import React from "react";
import axios from "axios";
import { Posts, Filter } from "./types";
import { NewPost } from "../types";

export const url = "https://localhost:7025/api/";

export async function getPosts(filter: Filter) {
  try {
    const { data } = await axios.post<Posts>(`${url}post/search`, filter);

    console.log(JSON.stringify(data, null, 4));
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
  debugger;
  let data = new FormData();
  const _ = post.pictures.map((pic) => {
    return data.append(`file-${pic.fileName}`, pic.file, pic.fileName);
  });
  data.append("title", post.title);
  data.append("description", post.description);

  axios
    .post(`${url}post/new`, data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then((response) => {
      //handle success
    })
    .catch((error) => {
      //handle error
    });
}
