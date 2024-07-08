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
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts.length > 0 ? (
            <>
              {posts.map((post, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
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
