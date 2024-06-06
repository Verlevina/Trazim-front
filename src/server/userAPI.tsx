import axios from "axios";
import { url } from "./api";
import { User, UserSinginRequest } from "./types";

  export async function getCurrentUser() {
    const { data, status } = await axios.get<User>(
      `${url}Authenticate/getCurrentUser`
    );
    return data;
  }

  export async function login( user: UserSinginRequest) {
    try {
      const { data, status } = await axios.post<User>(
        `${url}Authenticate/login`,
        user
      );
      setJWTToken(data.token);
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

  export async function setJWTToken(token : string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  export async function deleteAuthHeader() {
    delete axios.defaults.headers.common["Authorization"];
  }