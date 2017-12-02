import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Error = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ee0000;
  font-size: 18px;
  color: #fff;
`;

const ErrorComponent = ({ msg }) => (
  <Error>{msg}</Error>
);

ErrorComponent.propTypes = {
  msg: PropTypes.string,
};

ErrorComponent.defaultProps = {
  msg: '',
};

export default ErrorComponent;
