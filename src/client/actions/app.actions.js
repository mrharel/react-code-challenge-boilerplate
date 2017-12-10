export const LOAD_RESTURANTS_DATA = {
  REQUEST: 'load-resturant-data-requsts',
  SUCCESS: 'load-resturant-data-success',
  ERROR: 'load-resturant-data-error',
};

export const ADD_BOOKING = {
  REQUEST: 'add-booking-requsts',
  SUCCESS: 'add-booking-success',
  ERROR: 'ladd-booking-error',
};

export const loadResturantsData = () => ({
  type: LOAD_RESTURANTS_DATA.REQUEST,
});


export const loadResturantsDataSuccess = (resturants, bookings, users) => ({
  type: LOAD_RESTURANTS_DATA.SUCCESS,
  payload: {
    resturants,
    bookings,
    users,
  },
});

export const addBookingSuccess = (email, resturantId, dayId, name) => ({
  type: ADD_BOOKING.SUCCESS,
  payload: {
    email,
    resturantId,
    dayId,
    name,
  },
});
