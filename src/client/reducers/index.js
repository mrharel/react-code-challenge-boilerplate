import { combineReducers } from 'redux';
import adsReducer from './ads.reducer';

export default () => combineReducers({
  ads: adsReducer,
});

