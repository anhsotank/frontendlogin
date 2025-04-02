import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isfetching: false,
      error: false,
      msg: "",
    },
    logOut: {
      isfetching: false,
      error: false,
    },
    register: {
      isfetching: false,
      error: false,
      success: false,
    },
    loginFB: {
      currentUser: null,
      isfetching: false,

      error: false,
    },
    msg: "",
  },
  reducers: {
    loginStart: (state) => {
      state.login.isfetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isfetching = false;
      state.login.currentUser = action.payload;
      state.login.msg = false;
      state.login.error = false;
    },
    loginFailed: (state, action) => {
      state.login.isfetching = false;
      state.login.error = true;
      state.login.msg = action.payload;
    },
    //fb

    loginFBStart: (state) => {
      state.loginFB.isfetching = true;
    },
    loginFBSuccess: (state, action) => {
      state.loginFB.isfetching = false;
      state.loginFB.currentUser = action.payload;
      state.loginFB.error = false;
    },
    loginFBFailed: (state) => {
      state.loginFB.isfetching = false;
      state.loginFB.error = true;
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
    logOutStart: (state) => {
      state.logOut.isfetching = true;
    },
    logOutSuccess: (state) => {
      state.logOut.isfetching = false;
      state.login.currentUser = null;
      state.loginFB.currentUser = null;
      state.logOut.error = false;
    },
    logOutFailed: (state) => {
      state.logOut.isfetching = false;
      state.logOut.error = true;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  loginFBStart,
  loginFBFailed,
  loginFBSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} = authSlice.actions;

export default authSlice.reducer;
