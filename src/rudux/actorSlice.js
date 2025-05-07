import { createSlice } from "@reduxjs/toolkit";

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actors: {
      allactors: null,
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
    getMoviesbyActorStart: (state) => {
      state.movies.isfetching = true;
    },
    getMoviesbyActorSuccess: (state, action) => {
      state.movies.isfetching = false;
      state.movies.allmovies = action.payload;
    },
    getMoviesbyActorFailed: (state) => {
      state.movies.isfetching = false;
      state.movies.error = true;
    },

    getActorsStart: (state) => {
      state.actors.isfetching = true;
    },
    getActorsSuccess: (state, action) => {
      state.actors.isfetching = false;
      state.actors.allactors = action.payload;
    },
    getActorsFailed: (state) => {
      state.actors.isfetching = false;
      state.actors.error = true;
    },

    addActorsStart: (state) => {
      state.actors.isfetching = true;
    },
    addActorsSuccess: (state, action) => {
      state.actors.isfetching = false;
      state.msg = action.payload;
    },
    addActorsFailed: (state, action) => {
      state.actors.isfetching = false;
      state.actors.error = true;
      state.msg = action.payload;
    },

    deleteActorsStart: (state) => {
      state.actors.isfetching = true;
    },
    deleteActorsSuccess: (state, action) => {
      state.actors.isfetching = false;
      state.msg = action.payload;
    },
    deleteActorsFailed: (state, action) => {
      state.actors.isfetching = false;
      state.actors.error = true;
      state.msg = action.payload;
    },
    updateActorsStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    updateActorsSuccess: (state, action) => {
      state.actors.isfetching = false;
      state.msg = action.payload;
    },
    updateActorsFailed: (state, action) => {
      state.actors.isfetching = false;
      state.actors.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getMoviesbyActorFailed,
  getMoviesbyActorStart,
  getMoviesbyActorSuccess,
  getActorsStart,
  getActorsSuccess,
  getActorsFailed,
  deleteActorsStart,
  deleteActorsSuccess,
  deleteActorsFailed,
  addActorsStart,
  addActorsFailed,
  addActorsSuccess,
  updateActorsStart,
  updateActorsSuccess,
  updateActorsFailed,
} = actorSlice.actions;

export default actorSlice.reducer;
