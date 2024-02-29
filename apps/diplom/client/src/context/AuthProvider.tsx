import React, { useState, useEffect } from 'react';

interface User {
  username: string;
  role: string;
  token: string;
}

export const AuthContext = React.createContext<User | any>({});

const AuthProvider: React.FC<React.ReactNode| any> = ({ children }) => {
  const [auth, setAuth] = useState<User | any>({ loading: true, user: null });
  const saveAuth = (user : User) => {
    setAuth({user: user});
  };

  const deleteAuth = () => {
    setAuth({user: null});
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('authData') || "{}");
    setAuth({user: user});
  }, []);

  useEffect(() => {
    window.localStorage.setItem('authData', JSON.stringify(auth.user));
  }, [auth.user]);
  return (
    <AuthContext.Provider value={{ auth, saveAuth, deleteAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
