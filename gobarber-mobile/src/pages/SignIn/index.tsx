import React from 'react';
import { Image } from 'react-native';
import logger from 'debug';
import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />
      <Title>Faça seu logon</Title>
      <Input name={'email'} icon={'mail'} placeholder={'E-mail'} />
      <Input name={'password'} icon={'lock'} placeholder={'Senha'} />
      <Button
        onPress={() => {
          logger.log('deu!');
        }}>
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
