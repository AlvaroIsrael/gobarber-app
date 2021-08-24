import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Container, Content, AnimationContainer, Background, Copyright, LogoImage } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import signInBackground from '../../assets/sign-in-background.webp';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      const form = formRef.current;
      try {
        form?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          form?.setErrors(error);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, signIn, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoImage src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" type="email" autoComplete="email" />
            <Input name="password" icon={FiLock} placeholder="Senha" type="password" autoComplete="current-password" />
            <Button type="submit">Entrar</Button>

            <Link to="forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
        <Copyright>
          ❤️&nbsp;
          <a href="https://github.com/AlvaroIsrael/gobarber-app">
            <strong>Álvaro Israel Nunes Leite</strong>
          </a>
          &nbsp;&copy; 2021
        </Copyright>
      </Content>
      <Background>
        <LazyLoadImage alt="Go Barber Background" src={signInBackground} effect="blur" />
      </Background>
    </Container>
  );
};

export default SignIn;
