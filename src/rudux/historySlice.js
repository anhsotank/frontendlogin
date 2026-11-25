import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    historys: {
      allhistorys: null,
      isfetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    gethistorysStart: (state) => {
      state.historys.isfetching = true;
    },
    gethistorysSuccess: (state, action) => {
      state.historys.isfetching = false;
      state.historys.allhistorys = action.payload;
    },
    gethistorysFailed: (state) => {
      state.historys.isfetching = false;
      state.historys.error = true;
    },

    addhistorysStart: (state) => {
      state.historys.isfetching = true;
    },
    addhistorysSuccess: (state, action) => {
      state.historys.isfetching = false;
      state.msg = action.payload;
    },
    addhistorysFailed: (state, action) => {
      state.historys.isfetching = false;
      state.historys.error = true;
      state.msg = action.payload;
    },

    deletehistorysStart: (state) => {
      state.historys.isfetching = true;
    },
    deletehistorysSuccess: (state, action) => {
      state.historys.isfetching = false;
      state.msg = action.payload;
    },
    deletehistorysFailed: (state, action) => {
      state.historys.isfetching = false;
      state.historys.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  gethistorysStart,
  gethistorysSuccess,
  gethistorysFailed,
  deletehistorysStart,
  deletehistorysSuccess,
  deletehistorysFailed,
  addhistorysStart,
  addhistorysFailed,
  addhistorysSuccess,
} = historySlice.actions;

export default historySlice.reducer;
