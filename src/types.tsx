import { subscribeTypes } from "./constants/subscribeTypes";
import user, { UserState } from "./store/user/user";

export interface IFile {
  url: string;
  name: string;
}

export type ImageType = {
  fileName: string;
  file: File;
  image: string;
  row: number;
  column: number;
};

export type NewPost = {
  title: string;
  description: string;
  pictures: ImageType[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  languageId: number;
  locationId: number;
  login: string;
  picture: string | null;
  pictureUrl: string | null;
  surname: string;
  telegram: string;
  userRating: number;
  isSignedIn: boolean;
  password: string;
  subscribe: subscribeTypes[];
};

export type Identification = {
  Surname: string;
  Name: string;
};

export const mapUserToState = (user: User) => {
  const userState = {
    name: user.name,
    email: user.email,
    id: user.id,
    languageId: user.languageId,
    login: user.login,
    locationId: user.locationId,
    pictureUrl: user.picture,
    surname: user.surname,
    telegram: user.telegram,
    userRating: user.userRating,
    token: "",
    isSignedIn: false,
    subscribe: user.subscribe,
  } as UserState;
  return userState;
};

export const mapUserStateToUser = (userState: UserState) => {
  const user = {
    name: userState.name,
    email: userState.email,
    id: userState.id,
    languageId: userState.languageId,
    login: userState.login,
    locationId: userState.locationId,
    pictureUrl: userState.pictureUrl,
    surname: userState.surname,
    telegram: userState.telegram,
    userRating: userState.userRating,
    isSignedIn: userState.isSignedIn,
    password: "",
    picture: null,
    subscribe: userState.subscribe,
  } as User;
  return user;
};
