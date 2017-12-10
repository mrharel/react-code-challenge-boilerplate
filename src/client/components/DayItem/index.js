import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
  background-color: #884310;
  padding: 5px;
  border-radius: 5px;
  text-align: right;
  margin-bottom: 10px;
`;


const Count = styled.span`
  display: inline-block;
  padding: 5px;
  background-color: #fff;
  
`;

const Button = styled.button``;

class DayItem extends React.PureComponent {
  onAdd = () => {
     this.props.onAdd(this.props.resturant.id, this.props.dayId)
  };

  render() {
    const { numberOfBookings } = this.props;
    return (
      <Container>
        <Count>{numberOfBookings}</Count>
        <Button onClick={this.onAdd}>+</Button>
      </Container>
    );
  }
}

export default DayItem;