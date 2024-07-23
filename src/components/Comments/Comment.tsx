import React from "react";
import { Comment } from "../../server/types";
interface CommentProps {
  comment: Comment;
}
const CommentComponent = ({ comment }: CommentProps) => {
  return <div>{comment.value}</div>;
};
export default CommentComponent;
