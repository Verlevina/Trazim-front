import { Modal, Button, Box } from "@mui/material";
import React from "react";
import NewAdd from "../pages/NewAdd";
import {
  TranslationFC,
  TranslationKeys,
} from "../Translation/TranslationComponent";
import { CurrentLanguageContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleModal } from "../store/newPost/newPost";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export function AddPostButton() {
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleModal(true));
  };
  return (
    <Button onClick={handleOpen}>
      {translationContext(TranslationKeys.CreateNewPost)}
    </Button>
  );
}

export default function AddPost() {
  const isOpen = useSelector((state: RootState) => state.newPost);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal(false));
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "90%", height: "90vh" }}>
          <NewAdd />
        </Box>
      </Modal>
    </>
  );
}
