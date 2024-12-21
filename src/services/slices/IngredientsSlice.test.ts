import ingredientsSlice, {
  getIngredients,
  initialState,
  TStateIngredients
} from './IngredientsSlice';

//тестовый ингредиент
const testIngredient = [
  {
    _id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsSlice tests', () => {
  //проверка редьюсера при pending
  test('Test getIngredients - if pending, loading - true, error - null ', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'error'
      },
      getIngredients.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  //проверка редьюсера при fulfilled
  test('Test getIngredients - if fulfilled, loading - false, error - null, update state', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true //Устанавливаем `loading` в `true`, имитируя активную загрузку данных
      },
      getIngredients.fulfilled(testIngredient, '')
    );

    expect(actualState).toEqual({
      ingredients: testIngredient,
      loading: false,
      error: null
    });
  });

  //проверка редьюсера при rejected
  test('Test getIngredients - if rejected, loading - false', () => {
    const testError = new Error('Test error');

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },

      getIngredients.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Test error'
    });
  });
});
