import React, { useContext } from "react";
import {
  TranslationFC,
  TranslationKeys,
} from "../../Translation/TranslationComponent";
import { CurrentLanguageContext } from "../../App";
import { Button } from "@mui/material";
import { toggleSignUPModal } from "../../store/signup";
import { useDispatch } from "react-redux";
interface GoToSignUpProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const GoToSignUpButton = ({ setIsOpen }: GoToSignUpProps) => {
  const dispatch = useDispatch();
  const setIsOpenSignUpModal = (value: boolean) =>
    dispatch(toggleSignUPModal(value));
  const translationContext: TranslationFC = useContext(CurrentLanguageContext);
  return (
    <Button
      onClick={() => {
        setIsOpen(false);
        setIsOpenSignUpModal(true);
      }}
    >
      {translationContext(TranslationKeys.DonthaveanaccountSignUp)}
    </Button>
  );
};

export default GoToSignUpButton;
