import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
  BrowserRouter,
  RouteProps,
  useParams,
  useRoutes,
} from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RootState } from "./store/store";
import AuthWrapper from "./components/AuthWrapper";
import Login from "./pages/SignIn";
import MainRoute from "./pages/MainRoute";
import {
  TranslationFC,
  TranslationWithLanguage,
} from "./Translation/TranslationComponent";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import NewAdd from "./pages/NewAdd";
import AddPost from "./components/AddPost";
import PostDetails from "./pages/PostDetails";
import BodyWrapper from "./components/BodyWrapper";

export const CurrentLanguageContext = React.createContext<TranslationFC>(
  (value) => ""
);

const App: React.FC = () => {
  let routes = useRoutes([
    { path: "/", element: <MainRoute /> },
    { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
    { path: "/newAdd", element: <NewAdd /> },
    {
      path: "/post/:id",
      element: <PostDetails />,
    },

    // ...
  ]);
  return routes;
};

const AppWrapper = () => {
  const language = useSelector((state: RootState) => state.language);
  useEffect(() => {}, [language]);
  const translationWithLanguage = TranslationWithLanguage(language);
  return (
    <CurrentLanguageContext.Provider value={translationWithLanguage}>
      <BrowserRouter>
        <AuthWrapper>
          <Header />
          <BodyWrapper>
            <CssBaseline />
            <Container style={{ marginTop: "20px" }}>
              <App />
              <AddPost />
            </Container>
          </BodyWrapper>
        </AuthWrapper>
      </BrowserRouter>
    </CurrentLanguageContext.Provider>
  );
};

export default AppWrapper;
