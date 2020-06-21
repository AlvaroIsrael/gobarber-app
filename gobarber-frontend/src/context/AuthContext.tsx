import React, {createContext, PropsWithChildren, ReactNode, useCallback} from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  name: string;

  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({children}: PropsWithChildren<ReactNode>) => {
  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    try {
      const response = await api.post('sessions', {email, password});
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <AuthContext.Provider value={{name: 'Alvaro Israel', signIn}}>{children}</AuthContext.Provider>;
};
