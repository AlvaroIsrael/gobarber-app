import React, {createContext, PropsWithChildren, ReactNode, useCallback, useState, useContext} from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: object;

  signIn(credentials: SignInCredentials): Promise<void>;

  signOut(): void;
}

const Auth = createContext<AuthContextState>({} as AuthContextState);

const getDataFromLocalStorage = (): AuthState => {
  const token = localStorage.getItem('@GoBarber:token');
  const user = localStorage.getItem('@GoBarber:user');

  if (user && token) {
    return {token, user: JSON.parse(user)};
  }

  return {} as AuthState;
};

export const AuthProvider: React.FC = ({children}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState<AuthState>(getDataFromLocalStorage);
  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    try {
      const response = await api.post<AuthState>('sessions', {email, password});
      const {token, user} = response.data;

      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({token, user});
    } catch (e) {
      e.toString();
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);

  return <Auth.Provider value={{user: data.user, signIn, signOut}}>{children}</Auth.Provider>;
};

export const useAuth = (): AuthContextState => {
  const context = useContext(Auth);

  if (!context) {
    throw new Error('useAuth method must be used within an AuthProvider.');
  }

  return context;
};
