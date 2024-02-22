import React from "react";
import axios from "axios";
import { Posts, Filter } from "./types";

const url = "https://localhost:7025/";


  export async function getPosts( filter: Filter) {
    try {
      const { data, status } = await axios.post<Posts>(
        `${url}post`,
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