import { LOAD_RESTURANTS_DATA, ADD_BOOKING } from '../actions/app.actions';

export const initialState = {
  resturants: [],
  bookings: [],
  users: [],
  loading: true,
  error: null,
};

const addBooking = (state, { email, resturantId, dayId, name = 'unknown' }) => {

  const bookings = state.bookings.map((booking) => {
    if (booking.day !== dayId) return booking;
    return {
      ...booking,
      user_resturant: [...booking.user_resturant, { resturant: resturantId, user: email}],
    };
  });

  const users = [...state.users];
  const user = state.users.find(aUser => aUser.user === email);
  if (!user) {
    users.push({ user: email, name });
  }

  return {
    ...state,
    bookings,
    users,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESTURANTS_DATA.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_RESTURANTS_DATA.SUCCESS:
      return {
        ...state,
        loading: false,
        resturants: action.payload.resturants,
        bookings: action.payload.bookings,
        users: action.payload.users,
      };
    case LOAD_RESTURANTS_DATA.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_BOOKING.SUCCESS:
      return addBooking(state, action.payload);
    default:
      return state;
  }
};
