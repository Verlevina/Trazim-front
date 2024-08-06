import { Avatar } from "@mui/material";
import React from "react";
import { getShortName } from "../../utils/utils";

interface UserAvatarProps {
  type: "circular" | "rounded" | "square";
  name: string;
  surname: string;
  login: string;
  url: string;
  width: number;
  height: number;
}
export const UserAvatar = ({
  type,
  name,
  surname,
  login,
  url,
  height,
  width
}: UserAvatarProps) => {
  return (
    <Avatar sx={{ width: width, height: height }} src={url} variant={type}>
      {getShortName(name, surname, login)}
    </Avatar>
  );
};

interface UserTypedAvatarProps {
  name: string;
  surname: string;
  login: string;
  url: string;
  width: number;
  height: number;
}
export const UserRoundedAvatar = ({
  name,
  surname,
  login,
  url,
  width,
  height,
}: UserTypedAvatarProps) => {
  return (
    <UserAvatar
      name={name}
      surname={surname}
      login={login}
      url={url}
      type="rounded"
      width={width}
      height={height}
    />
  );
};

export const UserSquareAvatar = ({
  name,
  surname,
  login,
  url,
  width,
  height,
}: UserTypedAvatarProps) => {
  return (
    <UserAvatar
      name={name}
      surname={surname}
      login={login}
      url={url}
      type="square"
      width={width}
      height={height}
    />
  );
};
