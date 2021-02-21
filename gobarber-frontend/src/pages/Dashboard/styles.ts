import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #262626;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  min-width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 75px;
    margin-left: 10px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #ffffff;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #808080;
    }

    strong {
      color: #ffffff;
    }
  }
`;
