import React from "react";
import CardPostItem from "./CardPostItem";
import { Grid } from "@mui/material";
import { Post } from "../../server/types";
import Loader from "../Common/Loader";

interface PostDrawerProps {
  isLoading: boolean;
  posts: Post[];
}
const PostsDrawer = ({ posts, isLoading }: PostDrawerProps) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ sm: 12, md: 6, lg: 4, xs: 3 }}
        >
          {posts.length > 0 ? (
            <>
              {posts.map((post, index) => (
                <Grid item key={index}>
                  <CardPostItem post={post} />
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12}>
              List is empty yet!
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};
export default PostsDrawer;
