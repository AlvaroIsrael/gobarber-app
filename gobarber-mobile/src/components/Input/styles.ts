import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #808080;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232323;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.hasError &&
    css`
      border-color: #a90f27;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #fff;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #232323;
  font-size: 16px;
  font-family: ${'VarelaRound-Regular'};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
