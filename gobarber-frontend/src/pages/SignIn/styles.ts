import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;

  @media screen and (max-width: 1366px) {
    max-width: none;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #808080 inset !important;
    }

    h1 {
      margin-bottom: 24px;
      font-family: 'Montserrat', sans-serif;
      font-weight: bolder;
    }

    a {
      color: #fff;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#ffffff')};
      }
    }
  }

  > a {
    color: #fff;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#ffffff')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;

  span {
    width: 100%;

    img {
      object-fit: cover;
      height: 200%;
      width: 100%;
    }
  }

  @media screen and (max-width: 1366px) {
    display: none !important;
  }
`;

export const Copyright = styled.div`
  animation: ${appearFromLeft} 1s;

  a {
    color: #ffffff;

    :link {
      text-decoration: none;
    }

    :visited {
      background-color: transparent;
      text-decoration: none;
    }

    :hover {
      background-color: transparent;
      text-decoration: underline;
    }

    :active {
      background-color: transparent;
      text-decoration: underline;
    }
  }

  margin-bottom: 50px;
  position: absolute;
  bottom: 0;
`;

export const LogoImage = styled.img`
  width: 231px;
  height: 107px;
`;
