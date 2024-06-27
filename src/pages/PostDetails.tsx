import React, { useEffect, useState } from "react";
import { Post } from "../server/types";
import { getPostInfo } from "../server/userAPI";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import PostCarousel from "../components/Carousel";
import Loader from "../components/Loader";

const PostDetails = () => {
  const { id } = useParams();
  var postId = Number.parseInt(id ?? "0");
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    getPostInfo(postId).then((post) => setPost(post));
  }, [id]);
  return post === null ? (
    <Loader />
  ) : (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Grid item xs={4} md={12}>
          <PostCarousel pictures={post.pictureUrls} />
        </Grid>
        <Grid item xs={8} md={12}>
          <Paper>{post?.title}</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
          </Paper>
        </Grid>
      </Grid>
      <Grid xs={4}></Grid>
    </Grid>
  );
};
export default PostDetails;
