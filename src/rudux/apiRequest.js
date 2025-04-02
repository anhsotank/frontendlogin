import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  loginFBFailed,
  loginFBStart,
  loginFBSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from "./authSlice";
import {
  deleteUsersFailed,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

import {
  getoneMoviesStart,
  getoneMoviesSuccess,
  getoneMoviesFailed,
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailed,
  deleteMoviesSuccess,
  deleteMoviesStart,
  deleteMoviesFailed,
  getSearchMoviesStart,
  getSearchMoviesSuccess,
  getSearchMoviesFailed,
} from "./movieSlice";

export const loginUser = async (user, dispatch, navigate) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};
export const loginFacebook = async (user, dispatch, navigate) => {
  console.log(user); // Thông tin từ Facebook
  dispatch(loginFBStart());

  // Gửi token lên server để xác thực

  try {
    const res = await axios.post(
      "http://localhost:8300/v1/auth/facebook",
      user
    );
    dispatch(loginFBSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFBFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUsersStart());
  try {
    const res = await axios.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUsersFailed(err.response.data));
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    // const res = await axios.post("/v1/auth/logout", {
    //   headers: { token: `Bearer ${accessToken}` },
    // });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const getAllMovie = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/v1/movie");
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailed());
  }
};

export const deleteMovie = async (accessToken, dispatch, id) => {
  dispatch(deleteMoviesStart());
  try {
    const res = await axios.delete("/v1/movie/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteMoviesSuccess(res.data));
  } catch (err) {
    dispatch(deleteMoviesFailed(err.response.data));
  }
};

export const searchMovie = async (moviename, dispatch) => {
  if (!moviename.trim()) return; // Tránh gọi API khi input rỗng
  dispatch(getSearchMoviesStart());
  try {
    const res = await axios.get("/v1/movie/search?moviename=" + moviename);
    dispatch(getSearchMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getSearchMoviesFailed(err.response.data));
  }
};

export const getoneMovie = async (dispatch, id) => {
  dispatch(getoneMoviesStart());
  try {
    const res = await axios.get("/v1/movie/" + id);
    dispatch(getoneMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getoneMoviesFailed());
  }
};
