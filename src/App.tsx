import React from 'react';
import { BrowserRouter, useRoutes} from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import MainRoute from './pages/MainRoute';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App: React.FC = () => {
  const isAuthenticated = true; // Change this to your authentication logic
  let routes = useRoutes([
    { path: "/", element: <PrivateRoute authenticated={isAuthenticated}><MainRoute /></PrivateRoute> },
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

