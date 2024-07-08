import React from 'react';
import { PathRouteProps } from 'react-router-dom';

interface PrivateRouteProps extends PathRouteProps {
  authenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  authenticated,
  ...rest
}) => (
  <div {...rest}></div>
);

export default PrivateRoute;