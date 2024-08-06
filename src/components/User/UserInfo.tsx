import React from "react";
import { UserSquareAvatar } from "../Common/UserAvatar";
import { Grid } from "@mui/material";
import { getName } from "../../utils/utils";
import { globalUrl } from "../../server/userAPI";
interface UserInfoProps {
  name: string | undefined;
  surname: string | undefined;
  login: string | undefined;
  avatarUrl: string | undefined;
}
const UserInfo = ({
  name,
  surname,
  login,
  avatarUrl,
}: UserInfoProps) => {
  return (
    <Grid container>
      <Grid>
        <UserSquareAvatar
          login={login ?? ""}
          name={name ?? ""}
          surname={surname ?? ""}
          url={`${globalUrl}\\${avatarUrl}`}
          height={100}
          width={100}
        />
      </Grid>
      <Grid>{getName(name ?? "", surname ?? "", login ?? "")}</Grid>
    </Grid>
  );
};
export default UserInfo;
