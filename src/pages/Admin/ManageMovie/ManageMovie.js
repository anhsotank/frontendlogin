import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ManageMovie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import ReactPaginate from "react-paginate";

import {
  getAllMovie,
  deleteMovie,
  addMovie,
  updateMovie,
  getAllGenres,
  getAllactors,
} from "../../../rudux/apiRequest";
import FormComponent from "../../../Components/FormComponent";

const cx = classNames.bind(styles);

function MovieList() {
  const [movies, setmovies] = useState([]);
  const [filteredmovie, setFilteredmovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  // const [showForm, setShowForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null); // null = đang thêm mới

  const moviesPerPage = 7;

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userFB = useSelector((state) => state.auth.loginFB?.currentUser);
  const msg = useSelector((state) => state.movies?.msg);
  const listmovies = useSelector((state) => state.movies.movies?.allMovies);
  const listgenres = useSelector((state) => state.genres.genres?.allgenres);
  const listactors = useSelector((state) => state.actors.actors?.allactors);

  console.log(user?.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = user || userFB;
  console.log(currentUser);
  console.log(listmovies);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (!currentUser?.isAdmin) {
      toast.error("Bạn không có quyền truy cập trang này!");
      navigate("/"); // hoặc route khác tùy bạn
    } else {
      getAllMovie(dispatch);
      getAllGenres(dispatch);
      getAllactors(dispatch);
    }
  }, [currentUser]);

  useEffect(() => {
    // Mỗi khi listmovies thay đổi, cập nhật danh sách được lọc
    setFilteredmovies(listmovies || []);
  }, [listmovies]);

  const handledeleteMovie = async (movie) => {
    try {
      await deleteMovie(movie._id, currentUser?.accessToken, dispatch);
      toast.success("xóa phim thành công!");
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  const handleupdateMovie = (movie) => {
    console.log("Text", movie);
    setEditData(movie); // Gán phim đang sửa
    setVisible(true); // Mở form
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(0);
    const filtered = listmovies.filter((movie) =>
      movie?.moviename.toLowerCase().includes(value)
    );
    setFilteredmovies(filtered);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * moviesPerPage;
  const currentPagemovie = filteredmovie.slice(offset, offset + moviesPerPage);
  console.log(currentPagemovie);
  const pageCount = Math.ceil(filteredmovie.length / moviesPerPage);

  const handleFormSubmit = async (formData) => {
    const data = new FormData();
    console.log("formData", formData);
    data.append("moviename", formData.moviename);
    data.append("description", formData.description);
    data.append("releaseYear", formData.releaseYear);
    data.append("srcVideo", formData.srcVideo);
    data.append("genre", formData.genre);
    formData.actors?.forEach((id) => {
      data.append("actors", id);
    });
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    console.log("formData", data);

    if (editData) {
      await updateMovie(editData._id, data, currentUser?.accessToken, dispatch);
      toast.success("Cập nhật phim thành công!");
    } else {
      await addMovie(data, currentUser?.accessToken, dispatch);
      toast.success("Thêm phim thành công!");
    }

    setEditData(null);
    setVisible(false);
  };

  const renderForm = (attrs) => (
    <div className={cx("form-wrapper")} tabIndex="-1" {...attrs}>
      <FormComponent
        fields={movieFields}
        initialData={editData || {}} // Dữ liệu đang sửa hoặc rỗng khi thêm
        onSubmit={handleFormSubmit}
      />
    </div>
  );

  const movieFields = [
    {
      name: "moviename",
      label: "Tên phim",
      placeholder: "Nhập tên phim...",
      required: true,
    },
    {
      name: "description",
      label: "Mô tả",
      placeholder: "Mô tả phim...",
    },
    {
      name: "releaseYear",
      label: "Năm",
      placeholder: "2024",
    },
    {
      name: "srcVideo",
      label: "Đường dẫn video",
      placeholder: "https://www.youtube.com/...",
    },
    {
      name: "genre",
      label: "Thể loại",
      type: "select",
      options: listgenres?.map((g) => ({ label: g.name, value: g._id })),
      required: true,
    },
    {
      name: "actors",
      label: "Diễn viên",
      type: "multi-select",
      options: listactors?.map((actor) => ({
        label: actor.name,
        value: actor._id,
      })),
      required: true,
    },
    {
      name: "image",
      label: "Ảnh phim",
      type: "file",
    },
  ];

  const movieTitleFields = [
    {
      name: "image",
    },
    {
      name: "moviename",
    },
    { name: "description" },
    { name: "genre" },
    { name: "releaseYear" },
  ];

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Quản lý Phim</h2>

      <HeadlessTippy
        interactive
        visible={visible}
        placement="bottom-start"
        render={renderForm}
        onClickOutside={() => {
          setVisible(false);
          setEditData(null); // Reset khi đóng form
        }}
      >
        <button
          className={cx("add-btn")}
          onClick={() => {
            setEditData(null); // Reset để chuyển sang "thêm mới"
            setVisible(!visible);
          }}
        >
          {visible ? "Đóng form" : "Thêm phim"}
        </button>
      </HeadlessTippy>

      {/* 
      {showForm && (
        <FormComponent fields={movieFields} onSubmit={handleFormSubmit} />
      )} */}
      <input
        className={cx("search")}
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className={cx("header-movie-list")}>
        {movieTitleFields?.map((movie) => (
          <span>{movie.name}</span>
        ))}
        <span></span>
      </div>
      <ul className={cx("movie-list")}>
        {currentPagemovie?.map((movie) => (
          <li key={movie._id} className={cx("movie-item")}>
            {movie?.image && (
              <img
                src={`http://localhost:8300/uploads/${movie.image}`}
                alt="Ảnh phim"
              />
            )}

            <Tippy content={movie.moviename}>
              <span className={cx("moviename")}>
                {movie.moviename.length > 15
                  ? movie.moviename.slice(0, 15) + "..."
                  : movie.moviename}
              </span>
            </Tippy>
            <Tippy content={movie.description}>
              <span className={cx("description")}>
                {movie.description.length > 25
                  ? movie.description.slice(0, 25) + "..."
                  : movie.description}
              </span>
            </Tippy>
            <span>{movie?.genre?.name}</span>
            <span>{movie.releaseYear}</span>
            <div className={cx("action-btn")}>
              <button
                className={cx("delete-btn")}
                onClick={() => handledeleteMovie(movie)}
              >
                Xóa
              </button>
              <button
                className={cx("update-btn")}
                onClick={() => handleupdateMovie(movie)}
              >
                sửa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={cx("pagination")}
        activeClassName={cx("active")}
        pageClassName={cx("page-item")}
        previousClassName={cx("page-prev")}
        nextClassName={cx("page-next")}
      />
    </div>
  );
}

export default MovieList;
