import React, { useEffect, useState } from "react";
import { Post } from "../server/types";
import { getPostInfo } from "../server/userAPI";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import PostCarousel from "../components/Common/Carousel";
import Loader from "../components/Common/Loader";
import Comments from "../components/Comments/CommentsLayout";

const PostDetails = () => {
  const { id } = useParams();
  var postId = Number.parseInt(id ?? "0");
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    getPostInfo(postId).then((post) => setPost(post));
  }, [id, postId]);
  return post === null ? <Loader /> : <PostDetailaView post={post} />;
};

interface postDetailsPropsInterface {
  post: Post;
}

const PostDetailaView = ({ post }: postDetailsPropsInterface) => {
  return (
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
        <Grid item xs={12}>
          <Comments postId={post.id}/>
        </Grid>
      </Grid>
      <Grid xs={4}></Grid>
    </Grid>
  );
};

export default PostDetails;
