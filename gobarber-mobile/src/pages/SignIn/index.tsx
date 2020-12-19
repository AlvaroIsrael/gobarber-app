import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import logoImage from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />
      <Title>Faça seu logon</Title>
    </Container>
  );
};

export default SignIn;
