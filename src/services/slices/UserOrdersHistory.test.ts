//tests checks user order history slice reducers

import {
  TStateOrdersHistory,
  ordersHistory,
  userOrdersHistorySlice
} from './UserOrdersHistory';

// Начальное состояние для тестов

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
};

//Тестовые данные заказов для использования в тестах
const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный фалленианский люминесцентный метеоритный бургер',
      createdAt: '2024-12-21T13:08:21.267Z',
      updatedAt: '2024-12-21T13:08:21.912Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Альфа-сахаридный флюоресцентный минеральный фалленианский бургер',
      createdAt: '2024-12-21T13:12:46.129Z',
      updatedAt: '2024-12-21T13:12:46.982Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный антарианский астероидный альфа-сахаридный метеоритный бургер',
      createdAt: '2024-12-21T13:13:19.978Z',
      updatedAt: '2024-12-21T13:13:20.845Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('userOrderHistory tests', () => {
  // Тест редьюсера при pending
  test('test ordersHistory - if pending, loading - true, error - null', () => {
    const actualState = userOrdersHistorySlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      ordersHistory.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      error: null,
      loading: true
    });
  });

  // Тест редьюсера при fulfilled
  test('test ordersHistory - if fulfilled, loading - false, error - null, update data state', () => {
    const actualState = userOrdersHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.fulfilled(testOrders.orders, '')
    );

    expect(actualState).toEqual({
      orders: testOrders.orders,
      error: null,
      loading: false
    });
  });

  // Тест редьюсера при rejected
  it('test ordersHistory - if rejected, loading - false', () => {
    const testError = new Error('error');
    const actualState = userOrdersHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.rejected(testError, '')
    );

    expect(actualState).toEqual({
      orders: [],
      loading: false,
      error: 'error'
    });
  });
});
