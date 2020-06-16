import React from 'react';

import { get, set } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import Loading from '../../components/Loading';
import { Title, Form } from './style';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [isLoading, setLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');
  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Photos[0].url', ''));
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error('Erro ao obter imagem');
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', file);

    try {
      setLoading(true);
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto modificada com sucesso!');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto');
      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <>
      <Container>
        <Loading isLoading={isLoading} />
        <Title>Foto</Title>
        <Form>
          <label htmlFor="foto">
            {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
            <input type="file" id="foto" onChange={handleChange} />
          </label>
        </Form>
      </Container>
    </>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
