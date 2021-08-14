import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#262626' } }}>
    <Auth.Screen name={'SignIn'} component={SignIn} />
    <Auth.Screen name={'SignUp'} component={SignUp} />
    <Auth.Screen name={'ForgotPassword'} component={ForgotPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
