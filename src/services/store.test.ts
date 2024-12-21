import store, { rootReducer } from './store';

describe('RootReducer initialization test', () => {
  test('initialization state test', () => {

    const testAction = { type: '@@INIT' };

    const initialState = rootReducer(undefined, testAction);

    expect(initialState).toEqual(store.getState());
  });
});
