import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-family: ${'VarelaRound-Regular'};
  font-size: 32px;
  color: #ffffff;
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  font-family: ${'VarelaRound-Regular'};
  font-size: 18px;
  color: #808080;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  padding: 12px 24px;
  background: #0f43a9;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
  font-family: ${'VarelaRound-Regular'};
`;

export const OkButtonText = styled.Text`
  color: #ffffff;
  font-family: ${'VarelaRound-Regular'};
  font-size: 18px;
`;
