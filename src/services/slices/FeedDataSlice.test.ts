import {
  getFeedData,
  TStateFeed,
  feedDataSlice,
  getOrderByNumber
} from './FeedDataSlice';

// Начальное состояние
const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

//Тестовые данные заказов для использования в тестах, в глобальной переменной для общего доступа
const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Астероидный экзо-плантаго флюоресцентный альфа-сахаридный бургер',
      createdAt: '2024-12-21T10:57:37.894Z',
      updatedAt: '2024-12-21T10:57:38.847Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный антарианский space альфа-сахаридный экзо-плантаго традиционный-галактический spicy люминесцентный бургер',
      createdAt: '2024-12-21T10:50:44.033Z',
      updatedAt: '2024-12-21T10:50:45.012Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный метеоритный бургер',
      createdAt: '2024-12-21T10:44:30.105Z',
      updatedAt: '2024-12-21T10:44:31.036Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('FeedDataSlice tests', () => {
  // Проверка редьюсера на pending
  test('test getFeedData - if pending, load - true, error - null', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Feed error'
      },
      getFeedData.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true,
      modalOrder: null
    });
  });

  // Проверка редьюсера при fulfilled
  test('test getFeedData - if fulfilled, update state and loading - false', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.fulfilled(testOrders, '')
    );

    expect(actualState).toEqual({
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday,
      error: null,
      loading: false,
      modalOrder: null
    });
  });

  // Проверка редьюсера при rejected
  test('test getFeedData rejected', () => {
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.rejected(testErr, '')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
      error: 'Test err'
    });
  });

  // Проверка редьюсера при pending
  test('test getOrderByNumber - if pending, load - true, error - null', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'test error'
      },
      getOrderByNumber.pending('1', 1) //аргументы (номер заказа и идентификатор запроса) не используются непосредственно в тесте, но необходимы для соответствия сигнатуре запроса
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true,
      modalOrder: null
    });
  });

  // Проверка редюсера при fulfilled (установка данных в modalOrder)
  test('test getOrderByNumber - if fullfiled, loading - false', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.fulfilled(testOrders, '1', 1)
    );

    //проверяем, что modalOrder обновился, а loading завершена
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: false,
      modalOrder: testOrders.orders[0]
    });
  });

  // Проверка редьюсера при rejected
  test('test getOrderByNumber - if rejected, loading - false and set error', () => {
    const testErr = new Error('test error');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.rejected(testErr, '1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
      error: 'test error'
    });
  });
});
