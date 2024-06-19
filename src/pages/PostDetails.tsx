import React, { useEffect, useState } from "react";
import { Post } from "../server/types";
import { getPostInfo } from "../server/userAPI";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import PostCarousel from "../components/Carousel";

const PostDetails = () => {
  const { id } = useParams();
  var postId = Number.parseInt(id ?? "0");
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    getPostInfo(postId).then((post) => setPost(post));
  }, [id]);
  return post === null ? (
    <>loader</>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper>{post?.title}</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <PostCarousel pictures={post.pictureUrls} />
      </Grid>
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
    </Grid>
  );
};
export default PostDetails;
