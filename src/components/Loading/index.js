import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span>
        <img src="https://thumbs.gfycat.com/UnitedSmartBinturong-max-1mb.gif" />
        <h1>Estamos carregando</h1>
      </span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoadding: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
