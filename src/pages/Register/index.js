import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { Form } from './style';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStorage = useSelector((state) => state.auth.user.nome);
  const emailStorage = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStorage);
    setEmail(emailStorage);
  }, [emailStorage, id, nomeStorage]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deverá ter entra 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if ((!id && password.length < 6) || password.length > 50) {
      formErrors = true;
      toast.error('Senha deverpa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <>
      <Container>
        <Loading isLoading={isLoading} />
        <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@hotmail.com"
              required
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua melhor senha"
            />
          </label>
          <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
        </Form>
      </Container>
    </>
  );
}
