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

    &:focus: {
      border: 1px solid ${colors.primaryColor};
    }
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
