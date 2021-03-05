import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList } from './styles';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  const navigateToProfile = useCallback(() => {
    /* navigation.navigate('Profile'); */
    signOut();
  }, [navigation, signOut]);

  useEffect(() => {
    api
      .get('/api/v1/providers')
      .then(response => {
        setProviders(response.data);
      })
      .catch(() => setProviders([]));
  }, []);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      navigation.navigate('AppointmentDatePicker', { providerId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>

        <ProvidersList
          keyExtractor={provider => provider.id}
          data={providers}
          renderItem={({ item }) => <UserName>{item.name}</UserName>}
        />
      </Header>
    </Container>
  );
};
export default Dashboard;
