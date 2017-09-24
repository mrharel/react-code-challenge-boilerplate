import { APP_INITIALIZED } from '../actions/app.actions';

export const initialState = {
  ready: false,
  config: {
    debug: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_INITIALIZED:
      return {
        ...state,
        ready: true,
      };
    default:
      return state;
  }
};
