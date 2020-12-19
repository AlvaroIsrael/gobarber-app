import React, { PropsWithChildren } from 'react';
import { RouteProps as ReactDomRouteProps, Route as ReactDomRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends Omit<ReactDomRouteProps, 'component'> {
  isPrivate?: boolean;
  component: React.ElementType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: PropsWithChildren<RouteProps>) => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
