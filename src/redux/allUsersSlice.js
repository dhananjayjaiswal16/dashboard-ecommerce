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
    //DELETE USER
    deleteUserStart: (state) => {
      state.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id == action.payload),
        1
      )
    },
    deleteUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getUserSuccess, getUserStart, getUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = allUsersSlice.actions;
export default allUsersSlice.reducer;