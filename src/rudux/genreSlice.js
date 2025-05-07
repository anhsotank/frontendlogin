import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: {
      allgenres: null,
      isfetching: false,
      error: false,
    },
    movies: {
      allmovies: null,
      isfetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getMoviesbyGenreStart: (state) => {
      state.movies.isfetching = true;
    },
    getMoviesbyGenreSuccess: (state, action) => {
      state.movies.isfetching = false;
      state.movies.allmovies = action.payload;
    },
    getMoviesbyGenreFailed: (state) => {
      state.movies.isfetching = false;
      state.movies.error = true;
    },

    getgenresStart: (state) => {
      state.genres.isfetching = true;
    },
    getgenresSuccess: (state, action) => {
      state.genres.isfetching = false;
      state.genres.allgenres = action.payload;
    },
    getgenresFailed: (state) => {
      state.genres.isfetching = false;
      state.genres.error = true;
    },

    addgenresStart: (state) => {
      state.genres.isfetching = true;
    },
    addgenresSuccess: (state, action) => {
      state.genres.isfetching = false;
      state.msg = action.payload;
    },
    addgenresFailed: (state, action) => {
      state.genres.isfetching = false;
      state.genres.error = true;
      state.msg = action.payload;
    },

    deletegenresStart: (state) => {
      state.genres.isfetching = true;
    },
    deletegenresSuccess: (state, action) => {
      state.genres.isfetching = false;
      state.msg = action.payload;
    },
    deletegenresFailed: (state, action) => {
      state.genres.isfetching = false;
      state.genres.error = true;
      state.msg = action.payload;
    },
    updategenresStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    updategenresSuccess: (state, action) => {
      state.genres.isfetching = false;
      state.msg = action.payload;
    },
    updategenresFailed: (state, action) => {
      state.genres.isfetching = false;
      state.genres.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getMoviesbyGenreFailed,
  getMoviesbyGenreStart,
  getMoviesbyGenreSuccess,
  getgenresStart,
  getgenresSuccess,
  getgenresFailed,
  deletegenresStart,
  deletegenresSuccess,
  deletegenresFailed,
  addgenresStart,
  addgenresFailed,
  addgenresSuccess,
  updategenresStart,
  updategenresSuccess,
  updategenresFailed,
} = genreSlice.actions;

export default genreSlice.reducer;
