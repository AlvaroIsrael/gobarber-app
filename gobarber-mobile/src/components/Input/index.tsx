import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }: InputProps) => {
  return (
    <Container>
      <Icon name={icon} size={20} color='#232323' />
      <TextInput keyboardAppearance='default' selectionColor='#262626' placeholderTextColor='#232323' {...rest} />
    </Container>
  );
};

export default Input;
