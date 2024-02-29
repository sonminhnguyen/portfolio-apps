import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ AllowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const { loading } = auth;

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(auth.user);
  console.log(AllowedRoles?.includes(auth.user.role));

  // return <Outlet />;

  return AllowedRoles?.includes(auth.user.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/error-404" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
