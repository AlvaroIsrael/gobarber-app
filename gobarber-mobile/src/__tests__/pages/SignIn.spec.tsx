import React from 'react';
import { render } from 'react-native-testing-library';
import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SiginIn page', () => {
  it('should contain email field', () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('E-mail')).toBeTruthy();
  });

  it('should contain password field', () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
