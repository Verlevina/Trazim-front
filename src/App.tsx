import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RootState } from "./store/store";
import AuthWrapper from "./components/Common/AuthWrapper";
import Login from "./pages/SignIn";
import {
  TranslationFC,
  TranslationWithLanguage,
} from "./Translation/TranslationComponent";
import Header from "./components/Layout/Header";
import Profile from "./pages/Profile";
import NewAdd from "./pages/NewAdd";
import AddPost from "./components/AddPost/AddPost";
import PostDetails from "./pages/PostDetails";
import BodyWrapper from "./components/Layout/BodyWrapper";
import MainData from "./components/MainData/MainData";

export const CurrentLanguageContext = React.createContext<TranslationFC>(
  (value) => ""
);

const AppWrapper = () => {
  const language = useSelector((state: RootState) => state.language);
  useEffect(() => {}, [language]);
  const translationWithLanguage = TranslationWithLanguage(language);

  return (
    <CurrentLanguageContext.Provider value={translationWithLanguage}>
      <BrowserRouter>
        <AuthWrapper>
          <BodyWrapper>
            <Header />
            <CssBaseline />
            <Container style={{ marginTop: "20px" }}>
              <Routes>
                <Route path="/list/*" element={<MainData />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/newAdd" element={<NewAdd />} />
                <Route path="/post/:id" element={<PostDetails />} />
              </Routes>{" "}
              <AddPost />
            </Container>
          </BodyWrapper>
        </AuthWrapper>
      </BrowserRouter>
    </CurrentLanguageContext.Provider>
  );
};

export default AppWrapper;
