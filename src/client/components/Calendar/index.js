import React from 'react';
import styled from 'styled-components';
import Day from '../Day';

const Board = styled.div`
  background-color: blue;
  border-radius: 10px;
  display: flex;
  flex-direction: 'row';
  justify-content: space-between;   
  padding: 15px;
`;



class Calendar extends React.PureComponent {
  render() {
    const { resturants , bookings, onAdd } = this.props;
    return (
      <Board>
        {bookings.map(booking => <Day booking={booking} resturants={resturants} onAdd={onAdd} />)}
      </Board>
    );
  }
}

export default Calendar;