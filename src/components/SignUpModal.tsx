import * as React from "react";
import Button from "@mui/material/Button";

import {
  TranslationFC,
  TranslationKeys,
} from "../Translation/TranslationComponent";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentLanguageContext } from "../App";

import { toggleSignUPModal } from "../store/signup";
import UserSignUp from "./User/UserSingUp";

export default function SignUpModal() {
  //Translation
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.singUp);
  const setIsOpen = (value: boolean) => dispatch(toggleSignUPModal(value));
  const handleOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(!isOpen);
  };
  return (
    <React.Fragment>
      <Button onClick={handleOpenClick}>
        {translationContext(TranslationKeys.Signup)}
      </Button>
      {isOpen ? (
        <Modal
          className="modal-xl"
          open={isOpen}
          onClose={handleOpenClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UserSignUp
            afterCreatingCB={() => {
              setIsOpen(false);
            }}
            propsUser={null}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}
