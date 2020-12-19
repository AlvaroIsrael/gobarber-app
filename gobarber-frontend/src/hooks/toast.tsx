import React, { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;

  removeToast(id: string): void;
}

const Toast = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuidv4();

    const toast = {
      id,
      type,
      title,
      description,
    };

    setMessages(state => [...state, toast]);
  }, []);
  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);
  return (
    <Toast.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </Toast.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(Toast);

  if (!context) {
    throw new Error('useToast must be user within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
