import { LOAD_ADS } from '../actions/ads.action';

export const initialState = {
  items: [],
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADS.REQUEST:
      return {
        ...state,
        loaded: false,
        error: null,
      };
    case LOAD_ADS.SUCESS:
      return {
        ...state,
        loaded: true,
        error: null,
        items: action.ads,
      };
    case LOAD_ADS.ERROR:
      return {
        ...state,
        loaded: true,
        error: action.error,
        items: [],
      };
    default:
      return state;
  }
};
