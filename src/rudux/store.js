import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import commentReducer from "./commentSlice";
import favoriteReducer from "./favoriteSlice";
import genreReducer from "./genreSlice";
import actorReducer from "./actorSlice";
import historyReducer from "./historySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
    comments: commentReducer,
    favorites: favoriteReducer,
    genres: genreReducer,
    actors: actorReducer,
    historys: historyReducer,
  },
});
