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

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bolder;
  }

  p {
    margin-top: 8px;
    color: #808080;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #808080;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #ffffff;
    font-size: 20px;
    font-weight: bolder;
    font-family: 'Montserrat', sans-serif;
  }

  div {
    background: #393939;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #ffffff;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #808080;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #ffffff;

      p {
        margin-top: 4px;
        color: #ffffff;
      }

      svg {
        align-items: flex-end;
        color: #808080;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #808080;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #ffffff;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #ffffff;
    width: 70px;

    svg {
      color: #808080;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #393939;
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #808080;
    }

    strong {
      margin-left: 16px;
      color: #ffffff;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
`;
