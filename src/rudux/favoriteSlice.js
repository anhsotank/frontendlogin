import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: {
      allfavorites: null,
      isfetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getfavoritesStart: (state) => {
      state.favorites.isfetching = true;
    },
    getfavoritesSuccess: (state, action) => {
      state.favorites.isfetching = false;
      state.favorites.allfavorites = action.payload;
    },
    getfavoritesFailed: (state) => {
      state.favorites.isfetching = false;
      state.favorites.error = true;
    },

    addfavoritesStart: (state) => {
      state.favorites.isfetching = true;
    },
    addfavoritesSuccess: (state, action) => {
      state.favorites.isfetching = false;
      state.msg = action.payload;
    },
    addfavoritesFailed: (state, action) => {
      state.favorites.isfetching = false;
      state.favorites.error = true;
      state.msg = action.payload;
    },

    deletefavoritesStart: (state) => {
      state.favorites.isfetching = true;
    },
    deletefavoritesSuccess: (state, action) => {
      state.favorites.isfetching = false;
      state.msg = action.payload;
    },
    deletefavoritesFailed: (state, action) => {
      state.favorites.isfetching = false;
      state.favorites.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getfavoritesStart,
  getfavoritesSuccess,
  getfavoritesFailed,
  deletefavoritesStart,
  deletefavoritesSuccess,
  deletefavoritesFailed,
  addfavoritesStart,
  addfavoritesFailed,
  addfavoritesSuccess,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
