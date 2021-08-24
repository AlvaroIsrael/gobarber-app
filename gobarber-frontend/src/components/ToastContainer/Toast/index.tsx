import React, { PropsWithChildren, useEffect, FC, CSSProperties } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { SpringValue } from 'react-spring';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: CSSProperties | { right: SpringValue<string>; opacity: SpringValue<number> };
}

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
};

const Toast: FC<ToastProps> = ({ message, style }: PropsWithChildren<ToastProps>) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3_000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} hasdescription={Number(!!message.description)} style={style}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id)} type="button" aria-label="close">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
