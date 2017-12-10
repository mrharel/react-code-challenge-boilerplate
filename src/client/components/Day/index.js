import React from 'react';
import styled from 'styled-components';
import DayItem from '../DayItem';
const Container = styled.div`
  padding: 15px;
  background-color: #c58027;
  width: 15%;
  
`;

const Title = styled.h3``;

const Resturants = styled.div``;

class Day extends React.PureComponent {

  getNumberOfBookings(booking, resturantId) {
    return booking.user_resturant.reduce((count, userResturant) => {
      if (userResturant.resturant === resturantId) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  render() {
    const { booking, resturants, onAdd } = this.props;
    return (
      <Container>
        <Title>{booking.day}</Title>
        <Resturants>
          {resturants.map((resturant) => {
            const numberOfBookings = this.getNumberOfBookings(booking, resturant.id);
            return <DayItem
              resturant={resturant}
              numberOfBookings={numberOfBookings}
              dayId={booking.day}
              onAdd={onAdd}
            />
          })}
        </Resturants>
      </Container>
    );
  }
}


export default Day;
