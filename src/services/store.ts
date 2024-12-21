import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/IngredientsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import burgerConstructorSlice from './slices/BurgerConstructorSlice';
import userSlice from './slices/UserSlice';
import feedDataSlice from './slices/FeedDataSlice';
import userOrdersHistorySlice from './slices/UserOrdersHistorySlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedDataSlice.name]: feedDataSlice.reducer,
  [userOrdersHistorySlice.name]: userOrdersHistorySlice.reducer
});

export { rootReducer };

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
