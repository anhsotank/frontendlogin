import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

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
  getProfileStart,
  getProfileSuccess,
  getProfileFailed,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
} from "./userSlice";

import {
  getoneMoviesStart,
  getoneMoviesSuccess,
  getoneMoviesFailed,
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailed,
  addmoviesFailed,
  addmoviesStart,
  addmoviesSuccess,
  updateMoviesStart,
  updateMoviesSuccess,
  updateMoviesFailed,
  deleteMoviesSuccess,
  deleteMoviesStart,
  deleteMoviesFailed,
  getSearchMoviesStart,
  getSearchMoviesSuccess,
  getSearchMoviesFailed,
} from "./movieSlice";

import {
  getcommentsStart,
  getcommentsSuccess,
  getcommentsFailed,
  addcommentsStart,
  addcommentsSuccess,
  addcommentsFailed,
  deletecommentsStart,
  deletecommentsSuccess,
  deletecommentsFailed,
  updatecommentsStart,
  updatecommentsSuccess,
  updatecommentsFailed,
} from "./commentSlide";

import {
  addfavoritesStart,
  addfavoritesSuccess,
  addfavoritesFailed,
  getfavoritesFailed,
  getfavoritesStart,
  getfavoritesSuccess,
  deletefavoritesStart,
  deletefavoritesSuccess,
  deletefavoritesFailed,
} from "./favoriteSlide";

import {
  getMoviesbyGenreFailed,
  getMoviesbyGenreStart,
  getMoviesbyGenreSuccess,
  getgenresStart,
  getgenresSuccess,
  getgenresFailed,
  addgenresFailed,
  addgenresStart,
  addgenresSuccess,
  updategenresStart,
  updategenresSuccess,
  updategenresFailed,
  deletegenresSuccess,
  deletegenresStart,
  deletegenresFailed,
} from "./genreSlice";

import {
  addActorsStart,
  addActorsSuccess,
  addActorsFailed,
  getActorsStart,
  getActorsSuccess,
  getActorsFailed,
  deleteActorsStart,
  deleteActorsFailed,
  deleteActorsSuccess,
  updateActorsStart,
  updateActorsSuccess,
  updateActorsFailed,
} from "./actorSlice";

export const loginUser = async (user, dispatch, navigate) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    if (res.data?.isAdmin) {
      navigate(config.routes.dashboard); // hoặc config.routes.manageuser nếu bạn dùng config
    } else {
      navigate(config.routes.home);
    }
    toast.success(" Login Success!");
  } catch (err) {
    dispatch(loginFailed(err.response.data));
    toast.error(err.response.data);
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
    toast.success(" Register Success!");
  } catch (err) {
    dispatch(registerFailed());
    toast.error("Register Failed!");
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
    await getAllUsers(accessToken, dispatch);
  } catch (err) {
    dispatch(deleteUsersFailed(err.response.data));
  }
};

export const getProfile = async (accessToken, dispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await axios.get("/v1/user/profile", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailed());
  }
};

export const updateProfile = async (data, accessToken, dispatch) => {
  dispatch(updateProfileStart());
  try {
    const res = await axios.put("/v1/user/update", data, {
      headers: {
        token: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(updateProfileSuccess(res.data));
    getProfile(accessToken, dispatch);
  } catch (err) {
    dispatch(updateProfileFailed());
  }
};

export const changePassword = async (data, accessToken) => {
  try {
    await axios.put("/v1/user/password", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error("đổi mật khẩu thất bại:", err);
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
export const addMovie = async (movie, accessToken, dispatch) => {
  dispatch(addmoviesStart());
  try {
    const res = await axios.post("/v1/movie/createmovie", movie, {
      headers: {
        token: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addmoviesSuccess(res.data));
    getAllMovie(dispatch);
  } catch (err) {
    dispatch(addmoviesFailed());
  }
};
export const deleteMovie = async (id, accessToken, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    const res = await axios.delete("/v1/movie/deletemovie/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteMoviesSuccess(res.data));
    getAllMovie(dispatch);
  } catch (err) {
    dispatch(deleteMoviesFailed(err.response.data));
  }
};
export const updateMovie = async (id, data, accessToken, dispatch) => {
  dispatch(updateMoviesStart());
  try {
    const res = await axios.put("/v1/movie/updatemovie/" + id, data, {
      headers: {
        token: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(updateMoviesSuccess(res.data));
    getAllMovie(dispatch);
  } catch (err) {
    dispatch(updateMoviesFailed(err.response.data));
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

export const increaseView = async (dispatch, id) => {
  try {
    await axios.put(`/v1/movie/${id}/view`);
    getoneMovie(dispatch, id);
  } catch (error) {
    console.error("Tăng lượt xem thất bại:", error);
  }
};

export const getTopMovies = async () => {
  try {
    const res = await axios.get("v1/movie/top/viewed");
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy top phim:", err);
    return [];
  }
};
//Comment

export const getAllComment = async (dispatch, id) => {
  dispatch(getcommentsStart());
  try {
    const res = await axios.get("/v1/movie/" + id + "/comments");
    dispatch(getcommentsSuccess(res.data));
  } catch (err) {
    dispatch(getcommentsFailed());
  }
};

export const addComment = async (comment, accessToken, id, dispatch) => {
  dispatch(addcommentsStart());
  try {
    const res = await axios.post(
      "/v1/movie/" + id + "/createcomments",
      comment,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(addcommentsSuccess(res.data));
  } catch (err) {
    dispatch(addcommentsFailed());
    toast.error("đăng nhập để bình luận");
  }
};

export const deleteComment = async (accessToken, id, dispatch) => {
  dispatch(deletecommentsStart());
  try {
    const res = await axios.delete("/v1/movie/comments/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deletecommentsSuccess(res.data));
  } catch (err) {
    dispatch(deletecommentsFailed(err.response.data));
  }
};

export const updateComment = async (
  commentId,
  editedContent,
  accessToken,
  dispatch
) => {
  dispatch(updatecommentsStart());
  console.log(editedContent);
  try {
    const res = await axios.put(
      `/v1/movie/${commentId}/updatecomments`,
      { text: editedContent },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updatecommentsSuccess(res.data));
  } catch (err) {
    dispatch(updatecommentsFailed(err.response.data));
  }
};

// Favorite Movie

export const getAllfavorite = async (dispatch, accessToken) => {
  dispatch(getfavoritesStart());
  try {
    const res = await axios.get("/v1/user/favorite", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getfavoritesSuccess(res.data));
  } catch (err) {
    dispatch(getfavoritesFailed());
  }
};

export const addfavorite = async (id, accessToken, dispatch) => {
  dispatch(addfavoritesStart());
  try {
    const res = await axios.post(
      "/v1/user/addfavorite/" + id,
      {}, // body rỗng vì không cần gửi gì
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(addfavoritesSuccess(res.data));
    await getAllfavorite(dispatch, accessToken);
  } catch (err) {
    dispatch(addfavoritesFailed(err.response?.data || err.message));
  }
};

export const deletefavorite = async (id, accessToken, dispatch) => {
  dispatch(deletefavoritesStart());
  try {
    const res = await axios.delete("/v1/user/deletefavorite/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deletefavoritesSuccess(res.data));
    await getAllfavorite(dispatch, accessToken);
  } catch (err) {
    dispatch(deletefavoritesFailed(err.response.data));
  }
};

//genre movie

export const getAllGenres = async (dispatch) => {
  dispatch(getgenresStart());
  try {
    const res = await axios.get("/v1/genre");
    dispatch(getgenresSuccess(res.data));
  } catch (err) {
    dispatch(getgenresFailed());
  }
};

export const getAllMoviebyGenre = async (genreId, dispatch) => {
  dispatch(getMoviesbyGenreStart());
  try {
    const res = await axios.get("/v1/genre/" + genreId);
    dispatch(getMoviesbyGenreSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesbyGenreFailed());
  }
};

export const addGenre = async (genrename, accessToken, dispatch) => {
  dispatch(addgenresStart());
  try {
    const res = await axios.post("/v1/genre/creategenre", genrename, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(addgenresSuccess(res.data));
    getAllGenres(dispatch);
  } catch (err) {
    dispatch(addgenresFailed());
  }
};

export const deleteGenre = async (id, accessToken, dispatch) => {
  dispatch(deletegenresStart());
  try {
    const res = await axios.delete("/v1/genre/deletegenre/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deletegenresSuccess(res.data));
    getAllGenres(dispatch);
  } catch (err) {
    dispatch(deletegenresFailed(err.response.data));
  }
};
export const updateGenre = async (id, genrename, accessToken, dispatch) => {
  dispatch(updategenresStart());
  try {
    const res = await axios.put("/v1/genre/updategenre/" + id, genrename, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updategenresSuccess(res.data));
    getAllGenres(dispatch);
  } catch (err) {
    dispatch(updategenresFailed(err.response.data));
  }
};

//actor movie

export const getAllactors = async (dispatch) => {
  dispatch(getActorsStart());
  try {
    const res = await axios.get("/v1/actor");
    dispatch(getActorsSuccess(res.data));
  } catch (err) {
    dispatch(getActorsFailed());
  }
};

export const addActor = async (data, accessToken, dispatch) => {
  dispatch(addActorsStart());
  try {
    const res = await axios.post("/v1/actor/createactor", data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(addActorsSuccess(res.data));
    getAllactors(dispatch);
  } catch (err) {
    dispatch(addActorsFailed());
    toast.success("Thêm diễn viên thất bại!");
  }
};

export const deleteActor = async (id, accessToken, dispatch) => {
  dispatch(deleteActorsStart());
  try {
    const res = await axios.delete("/v1/actor/deleteactor/" + id, {
      headers: {
        token: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(deleteActorsSuccess(res.data));
    getAllactors(dispatch);
  } catch (err) {
    dispatch(deleteActorsFailed(err.response.data));
  }
};
export const updateActor = async (id, data, accessToken, dispatch) => {
  dispatch(updateActorsStart());
  try {
    const res = await axios.put("/v1/actor/updateactor/" + id, data, {
      headers: {
        token: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(updateActorsSuccess(res.data));
    getAllactors(dispatch);
  } catch (err) {
    dispatch(updateActorsFailed(err.response.data));
    toast.success("cập nhật phim thất bại !");
  }
};
