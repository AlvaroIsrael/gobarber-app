import React, { useRef, useCallback, useMemo } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  UserAvatar,
  BackButton,
  Header,
  HeaderTitle,
  UserAvatarButton,
  UserInitialsContainer,
  UserInitials,
  QuitButton,
  QuitButtonText,
  SaveButton,
  SaveButtonText,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleUpdateAvatar = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        maxWidth: 150,
        maxHeight: 150,
      },
      async response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          Alert.alert('Erro ao atualizar seu avatar.');
          return;
        }

        if (!(response.assets === undefined)) {
          const source = { uri: response.assets[0].uri };
          const data = new FormData();

          data.append('avatar', {
            type: 'image/jpeg',
            name: `${user.id}.jpg`,
            uri: source.uri,
          });

          try {
            const pacthResponse = await api.patch('/api/v1/users/avatar', data);
            await updateUser(pacthResponse.data);
          } catch (e) {
            Alert.alert('Erro ao atualizar seu avatar, tente novamente mais tarde.');
          }
        }
      },
    );
  }, [updateUser, user.id]);

  const nameInitials = useMemo(() => {
    return user.name
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }, [user.name]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSaveProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, password_confirmation } = data;

        const formData = {
          name,
          email,
          ...(old_password ? { old_password, password, password_confirmation } : {}),
        };

        const response = await api.put('/api/v1/profile', formData);

        await updateUser(response.data);

        Alert.alert('Perfil atualizado', 'As informações do perfil foram atualizadas com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert('Erro ao atualizar o perfil', 'Ocorreu um erro ao atualizar o perfil, tente novamente.');
      }
    },
    [navigation, updateUser],
  );

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1 }}>
          <Header>
            <BackButton onPress={handleGoBack}>
              <Icon name='chevron-left' size={24} color='#808080' />
            </BackButton>
            <HeaderTitle>Cabeleireiros</HeaderTitle>
          </Header>
          <Container>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              {user.avatar_url ? (
                <UserAvatar source={{ uri: user.avatar_url }} />
              ) : (
                <UserInitialsContainer>
                  <UserInitials>{nameInitials}</UserInitials>
                </UserInitialsContainer>
              )}
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSaveProfile}>
              <Input
                autoCapitalize='words'
                name='name'
                icon='user'
                placeholder='Nome'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                name='email'
                icon='mail'
                placeholder='E-mail'
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                containerStyle={{ marginTop: 16 }}
                ref={passwordInputRef}
                secureTextEntry
                name='old_password'
                icon='lock'
                placeholder='Senha atual'
                textContentType='newPassword'
                returnKeyType='next'
                onSubmitEditing={() => newPasswordInputRef.current?.focus()}
              />

              <Input
                ref={newPasswordInputRef}
                secureTextEntry
                name='password'
                icon='lock'
                placeholder='Nova senha'
                textContentType='newPassword'
                returnKeyType='next'
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name='password_confirmation'
                icon='lock'
                placeholder='Confirmar senha'
                textContentType='newPassword'
                returnKeyType='send'
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <SaveButton onPress={() => formRef.current?.submitForm()}>
                <SaveButtonText>Salvar alterações</SaveButtonText>
              </SaveButton>
            </Form>
            <QuitButton onPress={signOut}>
              <QuitButtonText>Sair</QuitButtonText>
            </QuitButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
