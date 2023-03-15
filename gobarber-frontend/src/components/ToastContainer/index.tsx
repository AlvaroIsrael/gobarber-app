import React, { CSSProperties } from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }: React.PropsWithChildren<ToastContainerProps>) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  } as CSSProperties);

  return (
    <Container>
      {messagesWithTransitions((transitionProps, item) => (
        <Toast key={item.id} style={transitionProps} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
