import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
  },
});
