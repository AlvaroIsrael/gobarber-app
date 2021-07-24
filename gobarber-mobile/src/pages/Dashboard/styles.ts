import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 24}px 24px 24px;
  background: #393939;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #808080;
  font-size: 20px;
  font-family: ${'Montserrat-Medium'};
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ffffff;
  font-family: ${'VarelaRound-Regular'};
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 2px;
  border-color: #808080;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>).attrs({
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
})``;

export const ProvidersListTitle = styled.Text`
  font-family: ${'Montserrat-Medium'};
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 12px;
`;

export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-bottom: 16px;
  background: #393939;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  border-width: 2px;
  border-color: #808080;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: ${'Montserrat-Regular'};
  font-size: 18px;
  color: #ffffff;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #ffffff;
  font-family: ${'VarelaRound-Regular'};
`;
