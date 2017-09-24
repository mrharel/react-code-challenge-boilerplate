import appReducer, { initialState } from '../../../src/client/reducers/app.reducer';
import { appInitializedAction } from '../../../src/client/actions/app.actions';


const state = {
  ready: false,
  config: {
    debug: true,
  },
};

test('initialState should be the correct value', () => {
  expect(initialState).toEqual(state);
});

test('appReducer should return the initial state when not state is given', () => {
  expect(appReducer(undefined, { type: 'unknown' })).toEqual(state);
});

test('appReducer should return the correct state for APP_INITIALIZED', () => {
  expect(appReducer(state, appInitializedAction()).ready).toBe(true);
});