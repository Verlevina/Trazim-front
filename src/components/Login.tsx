import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform authentication logic here
    setLoggedIn(true);
  };

  if (loggedIn) {
    return  <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;