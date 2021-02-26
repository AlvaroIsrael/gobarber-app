import React, { createContext, PropsWithChildren, ReactNode, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: User;

  signIn(credentials: SignInCredentials): Promise<void>;

  signOut(): void;

  updateUser(user: User): void;
}

const Auth = createContext<AuthContextState>({} as AuthContextState);

const getDataFromLocalStorage = (): AuthState => {
  const token = localStorage.getItem('@GoBarber:token');
  const user = localStorage.getItem('@GoBarber:user');

  if (user && token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
    return { token, user: JSON.parse(user) };
  }

  return {} as AuthState;
};

export const AuthProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState<AuthState>(getDataFromLocalStorage);
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('/api/v1/sessions', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return <Auth.Provider value={{ user: data.user, signIn, signOut, updateUser }}>{children}</Auth.Provider>;
};

export const useAuth = (): AuthContextState => {
  const context = useContext(Auth);

  if (!context) {
    throw new Error('useAuth method must be used within an AuthProvider.');
  }

  return context;
};
