import React, { useEffect } from 'react';
import { BrowserRouter, useRoutes} from 'react-router-dom';
import Login from './pages/SignIn';
import MainRoute from './pages/MainRoute';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

declare global {
  var languageId: number;
}

const App: React.FC = () => {
  const isAuthenticated = true; // Change this to your authentication logic
  const languageId = useSelector((state: RootState)=> state.user.languageId);
  useEffect(() => {
    globalThis.languageId = languageId;
  }, [languageId]);
  
  let routes = useRoutes([
    { path: "/", element: <MainRoute />},
    { path: "login", element: <Login /> },
    // ...
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;

