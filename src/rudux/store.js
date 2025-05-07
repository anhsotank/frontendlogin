import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import commentReducer from "./commentSlide";
import favoriteReducer from "./favoriteSlide";
import genreReducer from "./genreSlice";
import actorReducer from "./actorSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
    comments: commentReducer,
    favorites: favoriteReducer,
    genres: genreReducer,
    actors: actorReducer,
  },
});
