import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #808080;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;

`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #232323;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
