import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyle';
import { AlunoContainer, ProfilePicture, NovoAluno } from './style';
import axios from '../../services/axios';
import * as colors from '../../config/colors';
import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  React.useEffect(() => {
    setLoading(true);
    async function getData() {
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Algo deu errado');
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Cadastrar aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Photos[0].url', false) ? (
                <img src={aluno.Photos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <label>
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>
            </label>
            <label>
              <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} color={colors.errColor} />
              </Link>
              <FaExclamation
                size={16}
                display="none"
                color={colors.exclaColor}
                cursor="pointer"
                onClick={(e) => handleDelete(e, aluno.id, index)}
              />
            </label>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
