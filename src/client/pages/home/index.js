import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS } from '../../styles/constants';
import { loadResturantsData, loadResturantsDataSuccess, addBookingSuccess } from '../../actions/app.actions';
import { apiLoadDataFromServer, apiAddBooking } from '../../api';
import Calendar from '../../components/Calendar';
import AddBookingForm from '../../components/AddBookingForm';

const Content = styled.div``;

class Home extends React.Component {
  state = {
    addRequest: null,
  };

 componentDidMount() {
   this.props.dispatch(loadResturantsData());
   apiLoadDataFromServer()
    .then(({ resturants, bookings, users }) => {
     this.props.dispatch(loadResturantsDataSuccess(resturants, bookings, users));
    })
   .catch((error) => {
        console.log('Error:' , error);
   })
 }

  onAddBooking = (resturantId, dayId) => {
     this.setState(() => ({ addRequest: {resturantId, dayId}}));
  };

  isUserBookedAlready(email, resturantId, dayId) {
    const bookingDay = this.props.bookings.find(day => day.day === dayId);
    return bookingDay.user_resturant.reduce((isBooked, userResturant) => {
      if (userResturant.resturant === resturantId && userResturant.user === email) {
        return true;
      }
      return isBooked;
    }, false);
  }

  onCompleteForm = (result) => {
    const { addRequest: {resturantId, dayId} } = this.state;
    this.setState(() => ({ addRequest: null }));
    if (result) {
      if (!this.isUserBookedAlready(result.email, resturantId, dayId)) {
        apiAddBooking(result.email, resturantId, dayId)
          .then(() => {
            this.props.dispatch(addBookingSuccess(result.email, resturantId, dayId, result.name));
          });
      }
    }
  };


  render() {
    const { loading, resturants, bookings } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    let formTitle = null;
    if (this.state.addRequest) {
      formTitle = `Join ${resturants.find(({id}) => id === this.state.addRequest.resturantId).title}`
    }

    return (
      <Content>
        <Calendar
          resturants={resturants}
          bookings={bookings}
          onAdd={this.onAddBooking}
          />
        {this.state.addRequest && <AddBookingForm title={formTitle} onComplete={this.onCompleteForm} />}
      </Content>
    );
  }
}


const mapStateToProps = state => ({
  loading: state.app.loading,
  resturants: state.app.resturants,
  bookings: state.app.bookings,
  users: state.app.users,
  error: state.app.error,
});

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(Home);
