import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import api from '../../services/api';
import ForgotPassword from '../../pages/ForgotPassword';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Forgot Password Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should not be able to recover password without a valid e-mail.', async () => {
    const axiosPostStub = jest
      .spyOn(api, 'post')
      .mockImplementation(async () => api.post('/api/v1/password/forgot', {}))
      .mockReturnValue(Promise.resolve(1));

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'not-a-valid-email' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axiosPostStub).not.toHaveBeenCalled();
    });
  });

  it('should not be able to recover password if api fails.', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should be able to recover password with a valid e-mail.', async () => {
    const axiosPostStub = jest
      .spyOn(api, 'post')
      .mockImplementation(async () => api.post('/api/v1/password/forgot', {}))
      .mockReturnValue(Promise.resolve(1));

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axiosPostStub).toHaveBeenCalledTimes(1);
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });
});
