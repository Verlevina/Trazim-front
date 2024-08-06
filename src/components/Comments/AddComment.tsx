import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { addMessage } from "../../server/userAPI";

interface CreateCommentProps {
  parentId: number | null;
  postId: number;
}

const CreateComment = ({ parentId, postId }: CreateCommentProps) => {
  const [message, setMessage] = useState<string>("");
  const onCommentSend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // typechecks!
    await addMessage(message, parentId, postId).then((res) => setMessage(""));
  };
  return (
    <Box component="form" onSubmit={onCommentSend}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          value={message}
          variant="outlined"
          placeholder="Enter your comment"
          multiline
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
          }}
          minRows={1}
          sx={{ width: "100%" }}
          maxRows={Infinity}
        />
        <Button type={"submit"}>Send</Button>
      </FormControl>
    </Box>
  );
};

export default CreateComment;
