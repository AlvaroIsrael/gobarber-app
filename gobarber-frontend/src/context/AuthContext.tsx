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
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

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

  return <AuthContext.Provider value={{user: data.user, signIn}}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth method must be used within an AuthProvider.');
  }

  return context;
};
