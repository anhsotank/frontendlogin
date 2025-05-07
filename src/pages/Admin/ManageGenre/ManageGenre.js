import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ManageGenre.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import ReactPaginate from "react-paginate";

import {
  getAllGenres,
  deleteGenre,
  addGenre,
  updateGenre,
} from "../../../rudux/apiRequest";
import FormComponent from "../../../Components/FormComponent";

const cx = classNames.bind(styles);

function GenreList() {
  const [genres, setgenres] = useState([]);
  const [filteredgenre, setFilteredgenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  // const [showForm, setShowForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null); // null = đang thêm mới

  const genresPerPage = 7;

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userFB = useSelector((state) => state.auth.loginFB?.currentUser);
  const msg = useSelector((state) => state.genres?.msg);
  const listgenres = useSelector((state) => state.genres.genres?.allgenres);

  console.log(user?.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = user || userFB;
  console.log(currentUser);
  console.log(listgenres);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (!currentUser?.isAdmin) {
      toast.error("Bạn không có quyền truy cập trang này!");
      navigate("/"); // hoặc route khác tùy bạn
    } else {
      getAllGenres(dispatch);
    }
  }, [currentUser]);

  useEffect(() => {
    // Mỗi khi listgenres thay đổi, cập nhật danh sách được lọc
    setFilteredgenres(listgenres || []);
  }, [listgenres]);

  const handledeletegenre = async (genre) => {
    try {
      await deleteGenre(genre._id, currentUser?.accessToken, dispatch);
      toast.success("xóa phim thành công!");
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  const handleupdategenre = (genre) => {
    console.log("Text", genre);
    setEditData(genre); // Gán phim đang sửa
    setVisible(true); // Mở form
  };

  const handleSearch = (e) => {
    const value = e?.target?.value?.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(0);
    const filtered = listgenres?.filter((genre) =>
      genre?.name?.toLowerCase()?.includes(value)
    );
    setFilteredgenres(filtered);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * genresPerPage;
  const currentPagegenre = filteredgenre.slice(offset, offset + genresPerPage);
  console.log(currentPagegenre);
  const pageCount = Math.ceil(filteredgenre.length / genresPerPage);

  const handleFormSubmit = async (data) => {
    if (editData) {
      await updateGenre(editData._id, data, currentUser?.accessToken, dispatch);
      console.log("Cập nhật:", data);
      toast.success("Cập nhật phim thành công!");
    } else {
      await addGenre(data, currentUser?.accessToken, dispatch);
      toast.success("Thêm phim thành công!");
    }
    setEditData(null); // Reset trạng thái
    setVisible(false); // Đóng form
  };

  const renderForm = (attrs) => (
    <div className={cx("form-wrapper")} tabIndex="-1" {...attrs}>
      <FormComponent
        fields={genreFields}
        initialData={editData || {}} // Dữ liệu đang sửa hoặc rỗng khi thêm
        onSubmit={handleFormSubmit}
      />
    </div>
  );

  const genreFields = [
    {
      name: "genrename",
      label: "Tên thể loại",
      placeholder: "Nhập tên thể loại...",
      required: true,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Quản Lý Thể Loại</h2>

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
          {visible ? "Đóng form" : "Thêm thể loại"}
        </button>
      </HeadlessTippy>

      {/* 
      {showForm && (
        <FormComponent fields={genreFields} onSubmit={handleFormSubmit} />
      )} */}
      <input
        className={cx("search")}
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className={cx("genre-list")}>
        {currentPagegenre?.map((genre) => (
          <li key={genre._id} className={cx("genre-item")}>
            <span>{genre?.name}</span>

            <div className={cx("action-btn")}>
              <button
                className={cx("delete-btn")}
                onClick={() => handledeletegenre(genre)}
              >
                Xóa
              </button>
              <button
                className={cx("update-btn")}
                onClick={() => handleupdategenre(genre)}
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

export default GenreList;
