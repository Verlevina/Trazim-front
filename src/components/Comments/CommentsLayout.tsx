import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Comment } from "../../server/types";
import CommentComponent from "./Comment";
import { getComments } from "../../server/userAPI";
import CreateComment from "./AddComment";
interface CommentsProps {
  postId: number;
  commentId: number | null;
}
type CommentsList = {
  comments: Comment[];
  count: number;
};

export const CommentsLayout = ({ postId, commentId }: CommentsProps) => {
  return (
    <Grid
      container
      gap={2}
      sx={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <Grid item xs={12}>
        <CreateComment parentId={null} postId={postId} />
      </Grid>
      <Grid item>
        <Comments postId={postId} commentId={commentId} />
      </Grid>
    </Grid>
  );
};

const Comments = ({ postId, commentId }: CommentsProps) => {
  const [comments, setComments] = useState<CommentsList | null>(null);
  useEffect(() => {
    getComments(postId, commentId).then((comments) => {
      const commentList = { comments: comments, count: 0 } as CommentsList;
      setComments(commentList);
    });
  }, [commentId, postId]);
  return <Comments.CommentsDrawer comments={comments} />;
};

interface CommentsDrawerProps {
  comments: CommentsList | null;
}

const CommentsDrawer = ({ comments }: CommentsDrawerProps) => {
  return (
    <>
      {comments === null || comments.comments.length === 0 ? (
        <Grid container>
          List is empty
        </Grid>
      ) : (
        <Grid
          container
          gap={1}
          sx={{ marginLeft: "5px", borderLeft: "1px solid #ccc" }}
        >
          {comments?.comments.map((comment) => (
            <Grid item xs={12} key={comment.id}>
              <CommentComponent comment={comment} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
Comments.CommentsDrawer = CommentsDrawer;

export default Comments;
