import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255,255,255,0.5);
  font-size: 22px;
`;

const LoadingComponent = () => (
  <Loading>App is loading...</Loading>
);

export default LoadingComponent;
