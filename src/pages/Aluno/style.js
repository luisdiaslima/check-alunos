import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  input,
  select {
    background-color: #f0f0f5;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;

    text-size: 16px;
    border-radius: 8px;
    outline: none;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  button {
    /* width: 260px;
    height: 56px; */
    background-color: ${colors.primaryColor};
    border-radius: 8px;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    transition: all 600ms;
  }

  button:hover {
    background-color: #2fb86e;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    color: #fff;
    background: ${colors.primaryColor};
    bottom: 0;
    width: 36px;
    height: 36px;
    border-radius: 50px;
  }
`;
