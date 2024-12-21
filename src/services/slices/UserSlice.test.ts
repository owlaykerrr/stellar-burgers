import {
  TStateUser,
  toRegisterUser,
  logInUser,
  logOutUser,
  updateUser,
  userSlice,
  setUserCheck
} from './UserSlice';

const initialState: TStateUser = {
  userCheck: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

const testUser = {
  success: true,
  user: {
    email: 'test25@gmail.ru',
    name: 'test'
  },
  accessToken: 'test',
  refreshToken: 'test'
};

const testLogIn = {
  email: 'test25@gmail.ru',
  password: 'password'
};

const testRegisterUser = {
  email: 'test25@gmail.ru',
  name: 'test',
  password: 'password'
};

const updatedUser = {
  success: true,
  user: {
    email: 'test25@gmail.ru',
    name: 'test25'
  }
};

describe('userSlice reducers tests', () => {
  test('should handle userCheck', () => {
    const previousState = {
      ...initialState,
      userCheck: false 
    };

    // Вызываем редьюсер с предыдущим состоянием и экшеном setUserCheck
    const actualState = userSlice.reducer(previousState, setUserCheck());

    // Ожидаемое состояние после вызова редьюсера
    const expectedState = {
      ...previousState,
      userCheck: true
    };

    expect(actualState).toEqual(expectedState);
  });
});

describe('userSlice extrareducers tests', () => {
  test('should handle toRegisterUser into pending status', () => {
    const actualState = userSlice.reducer(
      initialState,
      toRegisterUser.pending('', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      loginUserRequest: true
    });
  });

  test('should handle toRegisterUser into fulfilled status', () => {
    const actualState = userSlice.reducer(
      initialState,
      toRegisterUser.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: false
    });
  });

  test('should handle toRegisterUser into rejected status', () => {
    const error = new Error('User register error');
    const actualState = userSlice.reducer(
      initialState,
      toRegisterUser.rejected(error, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      loginUserError: 'User register error',
      loginUserRequest: false
    });
  });

  test('should handle logInUser into pending status', () => {
    const actualState = userSlice.reducer(
      initialState,
      logInUser.pending('', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  test('should handle logInUser into fulfilled status', () => {
    const actualState = userSlice.reducer(
      initialState,
      logInUser.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthenticated: true,
      userCheck: true,
      loginUserRequest: false
    });
  });

  test('should handle logInUser into rejected status', () => {
    const error = new Error('User Log in Error');
    const actualState = userSlice.reducer(
      initialState,
      logInUser.rejected(error, '', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      userCheck: true,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: 'User Log in Error'
    });
  });

  test('should handle logOutUser into pending status', () => {
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userSlice.reducer(
      previousState,
      logOutUser.pending('')
    );

    expect(actualState).toEqual({
      ...previousState,
      loginUserRequest: true
    });
  });

  test('should handle logOutUser into fulfilled status', () => {
    const actualState = userSlice.reducer(
      initialState,
      logOutUser.fulfilled(undefined, '')
    );

    expect(actualState).toEqual({
      userCheck: false,
      isAuthenticated: false,
      user: null,
      loginUserError: null,
      loginUserRequest: false
    });
  });

  test('should handle logOutUser into rejected status', () => {
    const error = new Error('Failed to log out');
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userSlice.reducer(
      previousState,
      logOutUser.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...previousState,
      isAuthenticated: false,
      loginUserError: 'Failed to log out',
      loginUserRequest: false
    });
  });

  test('should handle updateUser into pending status', () => {
    const actualState = userSlice.reducer(
      initialState,
      updateUser.pending('', updatedUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      loginUserRequest: true
    });
  });

  test('should handle updateUser into fulfilled status', () => {
    const actualState = userSlice.reducer(
      initialState,
      updateUser.fulfilled(updatedUser, '', testUser.user)
    );
    expect(actualState).toEqual({
      isAuthenticated: true,
      user: updatedUser.user,
      loginUserRequest: false,
      userCheck: false,
      loginUserError: null
    });
  });

  test('should handle updateUser into rejected status', () => {
    const error = new Error('Failed to fetch update user');
    const actualState = userSlice.reducer(
      initialState,
      updateUser.rejected(error, '', testUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});
