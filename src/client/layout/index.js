import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../styles/constants';

const Main = styled.div`
  
`;

const Header = styled.div`
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
`;
const Footer = styled.div`
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  background-color: #333;
  color: #afafaf;
  padding: 20px;
  text-align: center; 
`;
const Content = styled.div`
  padding: 10px;
`;

const Layout = ({ children }) => (
  <Main>
    <Header>Header</Header>
    <Content>
      {children}
    </Content>
    <Footer>Footer</Footer>
  </Main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
