import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import {
  TranslationFC,
  TranslationKeys,
} from "../Translation/TranslationComponent";
import { Modal } from "@mui/material";
import { login } from "../server/userAPI";
import { UserSinginRequest } from "../server/types";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/user/user";
import { setLanguageReducer } from "../store/language/language";
import { LangugeArray } from "../constants/languages";
import { CurrentLanguageContext } from "../App";
const containerStyle = {
  background: "white",
};
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Trazim
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  //Translation
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<String>("");
  const dispatch = useDispatch();
  // const language = useSelector((state: RootState) => state.language);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      email: (
        event.currentTarget.elements.namedItem("email") as HTMLInputElement
      ).value,
      password: (
        event.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    } as UserSinginRequest;
    var userResponce = await login(user);
    if (userResponce?.token != null) {
      setIsOpen(false);
      var userState = {
        id: userResponce?.id,
        email: userResponce.email,
        isSignedIn: true,
        languageId: userResponce.languageId,
        locationId: userResponce.locationId,
        login: userResponce.login,
        name: userResponce.name,
        pictureUrl: userResponce.pictureUrl,
        surname: userResponce.surname,
        telegram: userResponce.telegram,
        token: userResponce.token,
        userRating: userResponce.userRating,
      };
      dispatch(loginReducer(userState));
      dispatch(setLanguageReducer(LangugeArray[+userState.languageId]));
      if (rememberMe) {
        localStorage.setItem("token", userState.token);
      }
    } else {
      var errorMessage = translationContext(TranslationKeys.AuthorizationError);
      setErrorMessage(errorMessage);
    }
  };

  const handleOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(!isOpen);
  };

  const handleRemembermecheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpenClick}>
        {translationContext(TranslationKeys.Login)}
      </Button>
      {isOpen ? (
        <Modal
          open={isOpen}
          onClose={handleOpenClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container component="main" maxWidth="xs" sx={containerStyle}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {translationContext(TranslationKeys.Authorization)}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleRemembermecheckbox}
                      value={rememberMe}
                      color="primary"
                    />
                  }
                  label={translationContext(TranslationKeys.RememberMe)}
                />
                <Typography component="p" variant="subtitle1">
                  {errorMessage}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {translationContext(TranslationKeys.Enter)}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {translationContext(TranslationKeys.ForgotPassword)}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {translationContext(
                        TranslationKeys.DonthaveanaccountSignUp
                      )}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}
