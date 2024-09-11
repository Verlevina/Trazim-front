import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Avatar,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  TranslationFC,
  TranslationKeys,
} from "../../Translation/TranslationComponent";
import { LangugeArray } from "../../constants/languages";
import { CurrentLanguageContext } from "../../App";

import { RootState } from "../../store/store";

import { ImageUpload } from "../Common/ImagesUpload";
import { CreateUserRequest } from "../../server/types";
import { updateUserRequest } from "../../server/userAPI";
import { Identification, ImageType, mapUserStateToUser } from "../../types";
import Subscribe from "./Subscribe";
import { subscribeTypes } from "../../constants/subscribeTypes";

const containerStyle = {
  background: "white",
  marginTop: "10px",
};

const UserUpdate = () => {
  const userState = useSelector((state: RootState) => state.user);
  const userStore = mapUserStateToUser(userState);

  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  const [errorMessage] = useState<string>("");
  const [shortLogin, setShortLogin] = useState<Identification>({
    Name: "",
    Surname: "",
  });
  const [user, setUser] = useState<CreateUserRequest>({
    ...userStore,
  } as CreateUserRequest);
  useEffect(() => {
    setUser({ ...userStore } as CreateUserRequest);
  }, [userState]);
  const language = useSelector((state: RootState) => state.language);
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateUserRequest(user);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrentLanguage(event.target.value);
  };
  if (user.id===0){
    return null;
  }
  return (
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
          {translationContext(TranslationKeys.Profile)}
        </Typography>
        <Box component="form" onSubmit={updateUser} noValidate sx={{ mt: 1 }}>
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
                      value={user.name}
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
                      value={user.surname}
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
                      value={user.login}
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
                  <Grid item xs={6}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <ImageUpload
                  pictureUrl={user.pictureUrl}
                  setUserPicture={(picture: ImageType | null) => {
                    setUser({ ...user, picture: picture });
                  }}
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
                value={user.email}
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
                value={user.telegram}
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
                value={user.locationId}
                onChange={(event) => {
                  user.locationId = +event.target.value;
                }}
              />
            </Grid>
          </Grid>

          <Typography component="p" variant="subtitle1">
            {errorMessage}
          </Typography>
          <Subscribe
            changeSubscribes={(subscribe: subscribeTypes[]) => {
              setUser({ ...user, subscribe: subscribe });
            }}
            subscribes={user.subscribe}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {translationContext(TranslationKeys.Update)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserUpdate;
