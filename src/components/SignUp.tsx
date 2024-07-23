import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useRef } from "react";
import {
  TranslationFC,
  TranslationKeys,
} from "../Translation/TranslationComponent";
import { Modal } from "@mui/material";
import { CreateUserRequest } from "../server/types";
import { useDispatch, useSelector } from "react-redux";
import { LangugeArray } from "../constants/languages";
import { RootState } from "../store/store";
import { CurrentLanguageContext } from "../App";
import { ImageUpload } from "./Common/ImagesUpload";
import { createUserRequest } from "../server/userAPI";
import { FamilyRestroomOutlined } from "@mui/icons-material";
import { toggleSignUPModal } from "../store/signup";
const containerStyle = {
  background: "white",
  marginTop: "10px",
};
type Identification = {
  Surname: string;
  Name: string;
};

export default function SignUp() {
  //Translation
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.singUp);
  const setIsOpen = (value:boolean)=>dispatch(toggleSignUPModal(value));
  const [errorMessage] = useState<string>("");
  const [shortLogin, setShortLogin] = useState<Identification>({
    Name: "",
    Surname: "",
  });
  const userRef = useRef<CreateUserRequest>({
    name: "",
    email: "",
    languageId: 0,
    locationId: 0,
    login: "",
    picture: null,
    surname: "",
    telegram: "",
  } as CreateUserRequest);
  const user = userRef.current;
  const language = useSelector((state: RootState) => state.language);
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createUserRequest(user);
    setIsOpen(false);
  };

  const handleOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrentLanguage(event.target.value);
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
          <Container component="main" maxWidth="lg" sx={containerStyle}>
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {translationContext(TranslationKeys.Signup)}
              </Typography>
              <Box
                component="form"
                onSubmit={createUser}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    Common
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User name"
                            name="name"
                            autoComplete="name"
                            onChange={(event) => {
                              setShortLogin({
                                ...shortLogin,
                                Name: event.target.value,
                              });
                              user.name = event.target.value;
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            margin="normal"
                            fullWidth
                            name="surname"
                            label="User surname"
                            type="surname"
                            id="surname"
                            onChange={(event) => {
                              setShortLogin({
                                ...shortLogin,
                                Surname: event.target.value,
                              });
                              user.surname = event.target.value;
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="login"
                            label="Login"
                            type="login"
                            id="login"
                            onChange={(event) => {
                              user.login = event.target.value;
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => {
                              user.password = event.target.value;
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      <ImageUpload
                        user={user}
                        name={`${shortLogin.Name.charAt(
                          0
                        )}${shortLogin.Surname.charAt(0)}`}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    Connection
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      autoComplete="current-email"
                      onChange={(event) => {
                        user.email = event.target.value;
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="telegram"
                      label="Telegram"
                      type="telegram"
                      id="telegram"
                      autoComplete="current-telegram"
                      onChange={(event) => {
                        user.telegram = event.target.value;
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      style={{ marginTop: "16px", marginBottom: "8px" }}
                    >
                      <InputLabel>Language</InputLabel>
                      <Select
                        labelId="select-label"
                        id="language"
                        value={currentLanguage}
                        label="Language"
                        onChange={handleChange}
                      >
                        {LangugeArray.map((l) => (
                          <MenuItem value={l}>{l}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="location"
                      label="Location"
                      type="number"
                      id="location"
                      onChange={(event) => {
                        user.locationId = +event.target.value;
                      }}
                    />
                  </Grid>
                </Grid>

                <Typography component="p" variant="subtitle1">
                  {errorMessage}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  {translationContext(TranslationKeys.Enter)}
                </Button>
              </Box>
            </Box>
          </Container>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}
