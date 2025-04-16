import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import commentReducer from "./commentSlide";
import favoriteReducer from "./favoriteSlide";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
    comments: commentReducer,
    favorites: favoriteReducer,
  },
});
