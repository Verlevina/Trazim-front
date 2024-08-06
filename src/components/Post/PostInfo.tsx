import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Post } from "../../server/types";
import UserInfo from "../User/UserInfo";

interface PostInfoProps {
  post: Post;
}
const PostInfo = ({ post }: PostInfoProps) => {
  return (
    <Grid container columnGap={2} gap={2}>
      <Grid item xs={12}>
        <UserInfo
          avatarUrl={post.user?.pictureUrl}
          login={post.user?.login}
          name={post.user?.name}
          surname={post.user?.surname}
        />
      </Grid>
      <Grid item>
        <Typography>{post?.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default PostInfo;
