import React, { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes} from 'react-router-dom';
import Login from './pages/SignIn';
import MainRoute from './pages/MainRoute';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import AuthWrapper from './components/AuthWrapper';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export const CurrentLanguageContext = React.createContext({})

const App: React.FC = () => {
  let routes = useRoutes([
    { path: "/", element: <MainRoute  />},
    { path: "/login", element: <Login /> },
    // ...
  ]);
  
  return routes;
};

const AppWrapper = () => {
  const language = useSelector((state: RootState)=> state.language);
  useEffect(() => {}, [language]);
  
  return (
    <CurrentLanguageContext.Provider value = {language}>
      <BrowserRouter>
        <AuthWrapper>      
          <App />
        </AuthWrapper>
      </BrowserRouter>
    </CurrentLanguageContext.Provider>
  );
};

export default AppWrapper;

