import React, {createContext, PropsWithChildren, ReactNode, useCallback, useContext} from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;

  removeToast(): void;
}

const Toast = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({children}: PropsWithChildren<ReactNode>) => {
  const addToast = useCallback(() => {
    console.log('marotoass');
  }, []);
  const removeToast = useCallback(() => {
    console.log('marotoass');
  }, []);
  return (
    <Toast.Provider value={{addToast, removeToast}}>
      {children}
      <ToastContainer />
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

export {ToastProvider, useToast};
