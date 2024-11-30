import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isfetching: false,
      error: false,
    },
    register: {
      isfetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isfetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isfetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isfetching = false;
      state.login.error = true;
    },
    //register
    registerStart: (state) => {
      state.register.isfetching = true;
    },
    registerSuccess: (state) => {
      state.register.isfetching = false;
      state.register.success = true;

      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isfetching = false;
      state.register.error = true;
      state.register.success = false;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
