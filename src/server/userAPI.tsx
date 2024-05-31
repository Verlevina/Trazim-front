import axios from "axios";
import { Posts, Filter } from "./types";
import {url} from "./api";

  export async function login( filter: Filter) {
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