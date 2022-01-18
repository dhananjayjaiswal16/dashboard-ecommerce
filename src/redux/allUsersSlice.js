import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: '',
  },
  reducers: {
    getUserStart: (state) => {
      state.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getUserFailure, getUserStart, getUserSuccess } = allUsersSlice.actions;
export default allUsersSlice.reducer;