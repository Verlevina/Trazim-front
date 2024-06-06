import React, { useEffect, useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./pages/SignIn";
import MainRoute from "./pages/MainRoute";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AuthWrapper from "./components/AuthWrapper";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
  TranslationFC,
  TranslationKeys,
  TranslationWithLanguage,
} from "./Translation/TranslationComponent";

export const CurrentLanguageContext = React.createContext<TranslationFC>(
  (value) => ""
);

const App: React.FC = () => {
  let routes = useRoutes([
    { path: "/", element: <MainRoute /> },
    { path: "/login", element: <Login /> },
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
          <App />
        </AuthWrapper>
      </BrowserRouter>
    </CurrentLanguageContext.Provider>
  );
};

export default AppWrapper;
