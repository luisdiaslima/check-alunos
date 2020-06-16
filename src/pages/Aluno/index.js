import React from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyle';
import { Form, ProfilePicture } from './style';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [nome, setNome] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [altura, setAltura] = React.useState('');
  const [foto, setFoto] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Photos[0].url', '');

        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setIdade(data.idade);
        setEmail(data.email);
        setPeso(data.peso);
        setAltura(data.altura);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 55) {
      toast.info('O nome precisa ter entre 3 á 55 caractres');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 55) {
      toast.info('O nome precisa ter entre 3 á 55 caractres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.info('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.info('Idade inválida');
      formErrors = true;
    }
    if (!isFloat(String(peso))) {
      toast.info('Peso inválido');
      formErrors = true;
    }
    if (!isFloat(String(altura))) {
      toast.info('Altura inválida');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) registrado com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'reponse.data', {});
      const errors = get(data, 'error', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Registrar aluno'}</h1>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do aluno"
          />
        </label>

        <label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Sobrenome"
          />
        </label>

        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
        </label>

        <label>
          <input
            type="text"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade"
          />
        </label>

        <label>
          <input
            type="text"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Peso"
          />
        </label>

        <label>
          <input
            type="text"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Altura"
          />
        </label>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
