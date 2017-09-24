import { APP_INITIALIZED, appInitializedAction } from '../../../src/client/actions/app.actions';

test('appInitializedAction must be defined', () => {
  expect(typeof appInitializedAction).toBe('function');
});

test('appInitializedAction must return the correct value', () => {
  expect(appInitializedAction()).toEqual({ type: APP_INITIALIZED });
});

