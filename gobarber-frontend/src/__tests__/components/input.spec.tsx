import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(<Input name="email" placeholder="E-mail" />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render border highlight when input is focused', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="E-mail" />);

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container-email');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #fff;');
      expect(containerElement).toHaveStyle('color: #fff;');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #fff;');
      expect(containerElement).not.toHaveStyle('color: #fff;');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="E-mail" />);

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container-email');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' },
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #fff;');
    });
  });
});
