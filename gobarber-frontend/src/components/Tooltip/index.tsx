import React, {PropsWithChildren, ReactNode} from 'react';
import {Container} from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  children?: PropsWithChildren<ReactNode>;
}

const Tooltip: React.FC<TooltipProps> = ({title, className, children}: TooltipProps) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
