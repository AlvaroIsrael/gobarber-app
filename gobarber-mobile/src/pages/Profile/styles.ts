import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 10}px 24px 24px;
  background: #393939;
  flex-direction: row;
  align-items: center;
  height: 135px;
`;

export const HeaderTitle = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-family: ${'Montserrat-Medium'};
  line-height: 28px;
  margin-left: 16px;
  margin-top: 22px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ffffff;
  font-family: ${'Montserrat-Medium'};
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 25px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  border-width: 2px;
  border-color: #808080;
  padding: 3px;
  align-self: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: ${Platform.OS === 'ios' ? 50 : 320}px;
  width: 130px;
  height: 130px;
  border-radius: 98px;
  background: #393939;
  border: 3px #808080;
  padding: 3px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const UserInitialsContainer = styled.View``;

export const UserInitials = styled.Text`
  font-size: 56px;
  color: #808080;
  font-family: ${'Montserrat-Medium'};
`;

export const QuitButton = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #393939;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 12px;
`;

export const QuitButtonText = styled.Text`
  font-family: ${'VarelaRound-Regular'};
  color: #fff;
  font-size: 16px;
`;

export const SaveButton = styled(RectButton)`
  margin-top: 25px;
  width: 100%;
  height: 60px;
  background: #0f43a9;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const SaveButtonText = styled.Text`
  font-family: ${'VarelaRound-Regular'};
  color: #fff;
  font-size: 16px;
`;
