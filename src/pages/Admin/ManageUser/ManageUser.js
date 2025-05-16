import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import axios from "axios";

import { getAllUsers, deleteUser } from "../../../rudux/apiRequest";

const cx = classNames.bind(styles);

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userFB = useSelector((state) => state.auth.loginFB?.currentUser);
  const msg = useSelector((state) => state.users?.msg);
  const listUsers = useSelector((state) => state.users.users?.allUsers);

  console.log(user?.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = user || userFB;
  console.log(currentUser);
  console.log(listUsers);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (!currentUser?.isAdmin) {
      toast.error("Bạn không có quyền truy cập trang này!");
      navigate("/"); // hoặc route khác tùy bạn
    } else {
      getAllUsers(currentUser?.accessToken, dispatch);
    }
  }, [currentUser]);

  useEffect(() => {
    // Mỗi khi listUsers thay đổi, cập nhật danh sách được lọc
    setFilteredUsers(listUsers || []);
  }, [listUsers]);

  const handledeleteUser = async (id) => {
    try {
      await deleteUser(currentUser?.accessToken, dispatch, id);
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(0);
    const filtered = listUsers.filter((user) =>
      user?.username.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const currentPageUsers = filteredUsers.slice(offset, offset + usersPerPage);
  console.log(currentPageUsers);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Quản lý người dùng</h2>

      <input
        className={cx("search")}
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className={cx("user-list")}>
        {currentPageUsers?.map(
          (user) =>
            user?.isAdmin || (
              <li key={user._id} className={cx("user-item")}>
                <img
                  src={
                    user.image
                      ? `/uploads/${user.image}`
                      : "https://avatar-ex-swe.nixcdn.com/avatar/2022/08/23/b/8/3/d/1661244166367.jpg"
                  }
                  alt="Avatar"
                  className={cx("avatar")}
                />
                <span>{user.username}</span>
                <button
                  className={cx("delete-btn")}
                  onClick={() => handledeleteUser(user._id)}
                >
                  Xóa
                </button>
              </li>
            )
        )}
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

export default UserList;
