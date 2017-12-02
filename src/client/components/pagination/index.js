import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  text-align: right;
`;
const Button = styled.button``;

class Pagination extends React.PureComponent {
  onClick = (e) => {
    const { target } = e;
    const id = +target.dataset.id;
    this.props.onPaginationChange(id);
  };
  render() {
    const { total, current } = this.props;

    const buttons = [];
    for (let i = 0; i < total; i++) {
      buttons.push(
        <Button
          onClick={this.onClick}
          key={i}
          disabled={i === current}
          data-id={i}
        >{i + 1}</Button>
      );
    }

    return (
      <Container>
        <Button disabled={current < total - 1} onClick={this.onClick} data-id={current - 1}>Previous</Button>
        {buttons}
        <Button disabled={current > 0} onClick={this.onClick} data-id={current + 1}>Next</Button>
      </Container>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
};

export default Pagination;
