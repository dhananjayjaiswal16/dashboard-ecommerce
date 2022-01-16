import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: '',
  },
  reducers: {
    getOrderStart: (state) => {
      state.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id == action.payload),
        1
      )
    },
    deleteOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getOrderFailure, getOrderStart, getOrderSuccess, deleteOrderFailure, deleteOrderStart, deleteOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer;