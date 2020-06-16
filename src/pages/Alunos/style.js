import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
  }

  div + div {
    border-top: 1px solid #eee;
  }

  span {
    padding: 10px;
    margin: auto;

    align-items: center;
    text-align: justify;
  }

  label {
    display: flex;
    margin: 10px;
  }
`;
export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
