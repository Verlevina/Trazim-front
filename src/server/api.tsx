import React from "react";
import axios from "axios";
import { Posts, Filter } from "./types";

export const url = "https://localhost:7025/api/";

  export async function getPosts( filter: Filter) {
    try {
      const { data, status } = await axios.post<Posts>(
        `${url}post/search`,
        filter
      );
  
      console.log(JSON.stringify(data, null, 4));  
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return null;
      } else {
        console.log('unexpected error: ', error);
        return null;
      }
    }
  }