import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isfetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isfetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isfetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isfetching = false;
      state.users.error = true;
    },

    deleteUsersStart: (state) => {
      state.users.isfetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.users.isfetching = false;
      state.msg = action.payload;
    },
    deleteUsersFailed: (state, action) => {
      state.users.isfetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailed,
} = userSlice.actions;

export default userSlice.reducer;
