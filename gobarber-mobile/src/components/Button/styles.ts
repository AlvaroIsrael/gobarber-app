import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #0f43a9;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-family: ${'VarelaRound-Regular'};
  color: #fff;
  font-size: 16px;
`;
