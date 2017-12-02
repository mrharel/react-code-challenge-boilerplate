import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../styles/constants';

const Main = styled.div`
  background: #eee;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  height: 40px;
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
  display: flex;
  flex: 1;
`;

const Layout = ({ children }) => (
  <Main>
    <Header>OLX</Header>
    <Content>
      {children}
    </Content>
    <Footer />
  </Main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
