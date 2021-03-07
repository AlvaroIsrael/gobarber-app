import React, { useEffect, useCallback, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest }: InputProps,
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleInputColorState = (hasFocus: boolean, hasContent: boolean, hasError: boolean): string => {
    if (hasError && !hasFocus) {
      return '#a90f27';
    }
    return hasFocus || hasContent ? '#ffffff' : '#232323';
  };

  return (
    <Container style={containerStyle} isFocused={isFocused} hasError={!!error}>
      <Icon name={icon} size={20} color={handleInputColorState(isFocused, isFilled, !!error)} />
      <TextInput
        ref={inputElementRef}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        keyboardAppearance='default'
        selectionColor='#262626'
        placeholderTextColor='#232323'
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
