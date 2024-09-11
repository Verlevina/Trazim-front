import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";
import {
  TranslationFC,
  TranslationKeys,
} from "../../Translation/TranslationComponent";
import { CurrentLanguageContext } from "../../App";
import { subscribeTypes } from "../../constants/subscribeTypes";
interface SubscribeProps {
  subscribes: subscribeTypes[];
  changeSubscribes: (subscribes: subscribeTypes[]) => void;
}
const Subscribe = ({ subscribes, changeSubscribes }: SubscribeProps) => {
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  const toggleElement = (type: subscribeTypes) => {
    const newSubscribes = new Set(!!subscribes ? [...subscribes] : []);
    if (newSubscribes.has(type)) {
      newSubscribes.delete(type);
    } else {
      newSubscribes.add(type);
    }
    changeSubscribes(Array.from(newSubscribes));
  };
  return (
    <Box>
      <Typography component="h1" variant="h5">
        {translationContext(TranslationKeys.Subscribe)}
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={subscribeTypes.telegram}
              checked={
                !!subscribes && subscribes.indexOf(subscribeTypes.telegram) >= 0
              }
              onChange={() => {
                toggleElement(subscribeTypes.telegram);
              }}
            />
          }
          label="Telegram"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={subscribeTypes.email}
              checked={
                !!subscribes && subscribes.indexOf(subscribeTypes.email) >= 0
              }
              onChange={() => {
                toggleElement(subscribeTypes.email);
              }}
            />
          }
          label="Email"
        />
      </FormGroup>
    </Box>
  );
};

export default Subscribe;
