import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    text-align: justify;
    justify-content: space-between;
  }

  div + div {
    border-top: 1px solid #eee;
  }

  span {
    flex: 1;
    padding: 10px;
    text-align: justify;
  }
`;
export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
  }
`;
