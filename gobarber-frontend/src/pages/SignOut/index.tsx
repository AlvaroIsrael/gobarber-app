import React from 'react';
import {FiArrowLeft, FiMail, FiLock, FiUser} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import {Container, Content, Background} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignOut: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>
        <h1>Faça seu cadastro</h1>

        <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
        <Input name="email" icon={FiMail} placeholder="E-mail" type="email" />
        <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default SignOut;
