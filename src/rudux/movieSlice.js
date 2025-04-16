import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: {
      allMovies: null,
      isfetching: false,
      error: false,
    },
    onemovies: {
      oneMovies: null,
      isfetching: false,
      error: false,
    },
    searchmovies: {
      resultoneMovies: null,
      isfetching: false,
      error: false,
    },

    msg: "",
  },
  reducers: {
    getoneMoviesStart: (state) => {
      state.onemovies.isfetching = true;
    },
    getoneMoviesSuccess: (state, action) => {
      state.onemovies.isfetching = false;
      state.onemovies.oneMovies = action.payload;
    },
    getoneMoviesFailed: (state) => {
      state.onemovies.isfetching = false;
      state.onemovies.error = true;
    },

    getMoviesStart: (state) => {
      state.movies.isfetching = true;
    },
    getMoviesSuccess: (state, action) => {
      state.movies.isfetching = false;
      state.movies.allMovies = action.payload;
    },
    getMoviesFailed: (state) => {
      state.movies.isfetching = false;
      state.movies.error = true;
    },

    updateMoviesStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    updateMoviesSuccess: (state, action) => {
      state.movies.isfetching = false;
      state.msg = action.payload;
    },
    updateMoviesFailed: (state, action) => {
      state.movies.isfetching = false;
      state.movies.error = true;
      state.msg = action.payload;
    },

    addmoviesStart: (state) => {
      state.movies.isfetching = true;
    },
    addmoviesSuccess: (state) => {
      state.movies.isfetching = false;

      state.movies.error = false;
    },
    addmoviesFailed: (state) => {
      state.movies.isfetching = false;
      state.movies.error = true;
    },

    deleteMoviesStart: (state) => {
      state.movies.isfetching = true;
    },
    deleteMoviesSuccess: (state, action) => {
      state.movies.isfetching = false;
      state.msg = action.payload;
    },
    deleteMoviesFailed: (state, action) => {
      state.movies.isfetching = false;
      state.movies.error = true;
      state.msg = action.payload;
    },

    getSearchMoviesStart: (state) => {
      state.searchmovies.isfetching = true;
    },
    getSearchMoviesSuccess: (state, action) => {
      state.searchmovies.isfetching = false;
      state.searchmovies.resultMovies = action.payload;
    },
    getSearchMoviesFailed: (state) => {
      state.searchmovies.isfetching = false;
      state.searchmovies.error = true;
    },
  },
});

export const {
  getoneMoviesFailed,
  getoneMoviesStart,
  getoneMoviesSuccess,
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailed,
  addmoviesFailed,
  addmoviesStart,
  addmoviesSuccess,
  updateMoviesStart,
  updateMoviesSuccess,
  updateMoviesFailed,
  deleteMoviesStart,
  deleteMoviesSuccess,
  deleteMoviesFailed,
  getSearchMoviesStart,
  getSearchMoviesSuccess,
  getSearchMoviesFailed,
} = movieSlice.actions;

export default movieSlice.reducer;
