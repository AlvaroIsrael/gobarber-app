import React, { PropsWithChildren, ReactNode } from 'react';

import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
