import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 24}px 24px 24px;
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

export const Avatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
