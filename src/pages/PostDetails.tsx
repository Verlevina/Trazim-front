import React, { useEffect, useState } from "react";
import { Post } from "../server/types";
import { getPostInfo } from "../server/userAPI";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import PostCarousel from "../components/Common/Carousel";
import Loader from "../components/Common/Loader";
import PostInfo from "../components/Post/PostInfo";
import { CommentsLayout } from "../components/Comments/CommentsLayout";

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
    <Grid container>
      <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item md={12}>
            <PostCarousel pictures={post.pictureUrls} />
          </Grid>
          <Grid item md={12} padding="10px">
            <PostInfo post={post} />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>

      <Grid item xs={4} md={4}>
        <CommentsLayout postId={post.id} commentId={null} />
      </Grid>
    </Grid>
  );
};

export default PostDetails;
