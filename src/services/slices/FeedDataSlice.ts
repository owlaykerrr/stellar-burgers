import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: null | string;
  loading: boolean;
  modalOrder: TOrder | null;
};

export const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const feedDataSlice = createSlice({
  name: 'feeddata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalAmountOrders: (state) => state.total,
    getTotalAmountToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    selectModalOrder: (state) => state.modalOrder
  }
});

export default feedDataSlice;
export const {
  getFeedOrders,
  getTotalAmountOrders,
  getTotalAmountToday,
  getLoading,
  getError,
  selectModalOrder
} = feedDataSlice.selectors;
