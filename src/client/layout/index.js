import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../styles/constants';

const Main = styled.div`
  width: 1100px;
`;

const Header = styled.div`
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
`;

const Content = styled.div`
  padding: 10px;
`;

const Layout = ({ children }) => (
  <Main>
    <Header>Weekly food Schedule - FoodLooz</Header>
    <Content>
      {children}
    </Content>
  </Main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
