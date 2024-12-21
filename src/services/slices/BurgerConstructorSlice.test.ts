import { TConstructorIngredient } from '@utils-types';
import burgerConstructorSlice, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './BurgerConstructorSlice';

describe('burgerConstructor slice tests ', () => {
  const ingredient_1: TConstructorIngredient = {
    id: '1',
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
  };

  const ingredient_2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const bun: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  //тест добавление ингредиента в конструктор
  test('addIngredient constructor test - ingredients', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient_1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient_1,
      id: expect.any(String)
    });
  });

  //тест добавления булки в конструктор
  test('addIngredient constructor test - buns', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  //тест удаление ингредиента из конструктора
  test('removeIngredient should remove ingredient from constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient_1, ingredient_2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(ingredient_1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient_2,
      id: expect.any(String)
    });
  });

  //тест перемещение ингредиента вверх
  test('moveUpIngredient should MOVE UP ingredient in constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient_1, ingredient_2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveUpIngredient(1)
    );
    // Ожидаем, что ingredient_2 переместится на позицию ingredient_1
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient_2,
      id: expect.any(String)
    });
    // Ожидаем, что ingredient_1 переместится на позицию ingredient_2
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient_1,
      id: expect.any(String)
    });
  });

  //тест перемещение ингредиента вниз
  test('moveDownIngredient should MOVE DOWN ingredient in constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient_1, ingredient_2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveDownIngredient(0) //передаем индекс элемента в массиве, который нужно переместить вниз.
    );
    // Ожидаем, что ingredient1 переместится на позицию ingredient_2
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient_1,
      id: expect.any(String)
    });
    // Ожидаем, что ingredient2 переместится на позицию ingredient_1
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient_2,
      id: expect.any(String)
    });
  });

  //тест очищения конструктора
  test('clearOrder should clear constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient_1, ingredient_2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(initialState, clearOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
