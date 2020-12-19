import React from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import logger from 'debug';
import Icon from 'react-native-vector-icons/Feather';
import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
          <Container>
            <Image source={logoImage} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Input name={'email'} icon={'mail'} placeholder={'E-mail'} />
            <Input name={'password'} icon={'lock'} placeholder={'Senha'} />
            <Button
              onPress={() => {
                logger.log('deu!');
              }}>
              Entrar
            </Button>
            <ForgotPassword onPress={() => {
            }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton>
        <Icon name='log-in' size={20} color='#fff' />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
