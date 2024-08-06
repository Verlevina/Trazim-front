import React, { useState } from "react";
import { Comment } from "../../server/types";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { getName } from "../../utils/utils";
import { globalUrl } from "../../server/userAPI";
import { UserSquareAvatar } from "../Common/UserAvatar";
import CreateComment from "./AddComment";
import Comments from "./CommentsLayout";
interface CommentProps {
  comment: Comment;
}
const CommentComponent = ({ comment }: CommentProps) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  debugger;
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        marginBottom: 0,
        paddingBottom: 0,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            {getName(comment.name, comment.surname, comment.login)}:
          </Typography>
        </Grid>
        <Grid item>
          <UserSquareAvatar
            login={comment.login}
            name={comment.name}
            surname={comment.surname}
            url={`${globalUrl}\\${comment.pictureUrl}`}
            width={50}
            height={50}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                {comment.value}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: "16px" }}>
          {comment.childrenCount == 0 ? (
            <Button
              onClick={() => {
                //TODO:
              }}
            >
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Remove
              </Typography>
            </Button>
          ) : null}
          <Button
            onClick={() => {
              setShowAddComment(!showAddComment);
            }}
          >
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              Answer
            </Typography>
          </Button>
          {comment.childrenCount > 0 ? (
            <Button
              onClick={() => {
                setShowAnswers(!showAnswers);
              }}
            >
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                {showAnswers
                  ? `Hide answers`
                  : `Show answers (${comment.childrenCount})`}
              </Typography>
            </Button>
          ) : null}
        </Grid>
        {showAddComment ? (
          <Grid container>
            <Grid item>
              <CreateComment parentId={comment.id} postId={comment.postId} />
            </Grid>
          </Grid>
        ) : null}
        {showAnswers ? (
          <Grid>
            <Comments postId={comment.postId} commentId={comment.id} />
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
};
export default CommentComponent;
