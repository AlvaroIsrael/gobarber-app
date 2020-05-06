import styled, {css} from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #808080;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #262626;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #fff;
      border-color: #fff;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #fff;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    &::placeholder {
      color: #262626;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
