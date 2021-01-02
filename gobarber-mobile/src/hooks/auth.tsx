import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: Record<string, unknown>;

  loading: boolean;

  signIn(credentials: SignInCredentials): Promise<void>;

  signOut(): void;
}

const Auth = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem('@GoBarber:token');
      const user = await AsyncStorage.getItem('@GoBarber:user');

      if (user && token) {
        setData({ token, user: JSON.parse(user) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('sessions', { email, password });
    const { token, user } = response.data;

    await AsyncStorage.setItem('@GoBarber:token', token);
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@GoBarber:token');
    await AsyncStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);

  return <Auth.Provider value={{ user: data.user, loading, signIn, signOut }}>{children}</Auth.Provider>;
};

export const useAuth = (): AuthContextState => {
  const context = useContext(Auth);

  if (!context) {
    throw new Error('useAuth method must be used within an AuthProvider.');
  }

  return context;
};