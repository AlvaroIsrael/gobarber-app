import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImage from '../../assets/logo-mobile.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/api/v1/password/forgot', { email: data.email });

      Alert.alert(
        'E-mail de recuperação enviado',
        'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na recuperação de senha',
        'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
      <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
        <Container>
          <Image source={logoImage} />
          <View>
            <Title>Recuperar senha</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType='email-address'
              name={'email'}
              icon={'mail'}
              placeholder={'E-mail'}
              returnKeyType='next'
            />
            <View>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Recuperar
              </Button>
            </View>
          </Form>
          <BackToSignIn
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Icon name='arrow-left' size={20} color='#fff' />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
