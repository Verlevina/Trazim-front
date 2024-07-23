import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Comment } from "../../server/types";
import CommentComponent from "./Comment";
import { getComments } from "../../server/userAPI";
interface CommentsProps {
  postId: Number;
}
type CommentsList = {
  comments: Comment[];
  count: Number;
};

const Comments = ({ postId }: CommentsProps) => {
  const [comments, setComments] = useState<CommentsList | null>(null);
  useEffect(() => {
    getComments(postId).then((comments) => {
      const commentList = { comments: comments, count: 0 } as CommentsList;
      setComments(commentList);
    });
  }, []);
  return <Comments.CommentsDrawer comments={comments} />;
};

interface CommentsDrawerProps {
  comments: CommentsList | null;
}

const CommentsDrawer = ({ comments }: CommentsDrawerProps) => {
  return (
    <Grid>
      <Grid item>add comment</Grid>
      <Grid item>
        {comments === null || comments.comments.length === 0 ? (
          <Grid container xs={12}>
            List is empty
          </Grid>
        ) : (
          <Grid container xs={12}>
            {comments?.comments.map((comment) => (
              <Grid item xs={12}>
                <CommentComponent comment={comment} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
Comments.CommentsDrawer = CommentsDrawer;

export default Comments;
