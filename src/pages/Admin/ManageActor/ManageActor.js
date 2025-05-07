import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ManageActor.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import ReactPaginate from "react-paginate";

import {
  getAllactors,
  addActor,
  deleteActor,
  updateActor,
} from "../../../rudux/apiRequest";
import FormComponent from "../../../Components/FormComponent";

const cx = classNames.bind(styles);

function ActorList() {
  const [filteredactor, setFilteredactors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  // const [showForm, setShowForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null); // null = đang thêm mới

  const actorsPerPage = 7;

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userFB = useSelector((state) => state.auth.loginFB?.currentUser);
  const msg = useSelector((state) => state.actors?.msg);
  const listactors = useSelector((state) => state.actors.actors?.allactors);

  console.log(user?.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = user || userFB;
  console.log(currentUser);
  console.log(listactors);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (!currentUser?.isAdmin) {
      toast.error("Bạn không có quyền truy cập trang này!");
      navigate("/"); // hoặc route khác tùy bạn
    } else {
      getAllactors(dispatch);
    }
  }, [currentUser]);

  useEffect(() => {
    // Mỗi khi listactors thay đổi, cập nhật danh sách được lọc
    setFilteredactors(listactors || []);
  }, [listactors]);

  const handledeleteactor = async (actor) => {
    try {
      await deleteActor(actor._id, currentUser?.accessToken, dispatch);
      toast.success("xóa phim thành công!");
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  const handleupdateactor = (actor) => {
    console.log("Text", actor);
    setEditData(actor); // Gán phim đang sửa
    setVisible(true); // Mở form
  };

  const handleSearch = (e) => {
    const value = e?.target?.value?.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(0);
    const filtered = listactors?.filter((actor) =>
      actor?.name?.toLowerCase()?.includes(value)
    );
    setFilteredactors(filtered);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * actorsPerPage;
  const currentPageactor = filteredactor.slice(offset, offset + actorsPerPage);
  console.log(currentPageactor);
  const pageCount = Math.ceil(filteredactor.length / actorsPerPage);

  const handleFormSubmit = async (formData) => {
    const data = new FormData();
    console.log("formData", formData);
    data.append("name", formData.name);
    data.append("bio", formData.bio);

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    console.log("formData", data);

    if (editData) {
      await updateActor(editData._id, data, currentUser?.accessToken, dispatch);
      toast.success("Cập nhật phim thành công!");
    } else {
      await addActor(data, currentUser?.accessToken, dispatch);
      toast.success("Thêm phim thành công!");
    }

    setEditData(null);
    setVisible(false);
  };

  const renderForm = (attrs) => (
    <div className={cx("form-wrapper")} tabIndex="-1" {...attrs}>
      <FormComponent
        fields={actorFields}
        initialData={editData || {}} // Dữ liệu đang sửa hoặc rỗng khi thêm
        onSubmit={handleFormSubmit}
      />
    </div>
  );

  const actorFields = [
    {
      name: "name",
      label: "Tên thể loại",
      placeholder: "Nhập tên thể loại...",
      required: true,
    },
    {
      name: "image",
      label: "Ảnh phim",
      type: "file",
    },
    {
      name: "bio",
      label: "bio",
      placeholder: "Nhập bio của diễn viên...",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Quản Lý Diễn viên</h2>

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
          {visible ? "Đóng form" : "Thêm diễn viên"}
        </button>
      </HeadlessTippy>

      {/* 
      {showForm && (
        <FormComponent fields={actorFields} onSubmit={handleFormSubmit} />
      )} */}
      <input
        className={cx("search")}
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className={cx("actor-list")}>
        {currentPageactor?.map((actor) => (
          <li key={actor._id} className={cx("actor-item")}>
            {actor?.image && (
              <img
                src={`http://localhost:8300/uploads/${actor.image}`}
                alt="Ảnh diễn viên"
              />
            )}
            <span>{actor?.name}</span>
            <Tippy content={actor.bio}>
              <span className={cx("bio")}>
                {actor.bio?.length > 25
                  ? actor.bio.slice(0, 25) + "..."
                  : actor.bio}
              </span>
            </Tippy>
            <div className={cx("action-btn")}>
              <button
                className={cx("delete-btn")}
                onClick={() => handledeleteactor(actor)}
              >
                Xóa
              </button>
              <button
                className={cx("update-btn")}
                onClick={() => handleupdateactor(actor)}
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

export default ActorList;
