import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS } from '../../styles/constants';

const HomeTitle = styled.h1`
  text-transform: capitalize;
  color: ${COLORS.TEXT_GRAY_FOCUS};
`;

const Content = styled.div``;

class Home extends React.Component {
  state = {
    color: 'red',
  };

  onTitleClick = () => {
    this.setState({ color: this.state.color === 'red' ? 'green' : 'red' });
  };

  render() {
    const { ready } = this.props;

    return (
      <Content>
        <HomeTitle
          className={ready ? 'ready' : 'not-ready'}
          onClick={this.onTitleClick}
          style={{ color: this.state.color }}
        >
          Start dev from this place...
        </HomeTitle>
        <img alt="" src="/static/react-logo.png" />
      </Content>
    );
  }
}


const mapStateToProps = state => ({
  ready: state.app.ready,
});

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Home);
