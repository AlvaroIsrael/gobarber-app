import React from 'react';
import { Image } from 'react-native';
import { Container } from './styles';
import logoImage from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />
    </Container>
  );
};

export default SignIn;
