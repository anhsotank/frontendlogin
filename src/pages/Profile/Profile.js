import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../../Components/FormComponent";
import {
  updateProfile,
  getProfile,
  changePassword,
} from "../../rudux/apiRequest";

const cx = classNames.bind(styles);

function Profile() {
  const user = useSelector(
    (state) => state.auth.login?.currentUser || state.auth.loginFB?.currentUser
  );
  const profile = useSelector((state) => state.users.users?.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    image: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        await getProfile(user.accessToken, dispatch);
      } catch (error) {
        toast.error("Không thể tải thông tin hồ sơ!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, dispatch, navigate]);

  // Sync editData when profile changes
  useEffect(() => {
    if (profile) {
      setEditData({
        username: profile.username || "",
        email: profile.email || "",
        image: profile.image || "",
      });
    }
  }, [profile]);

  const handleFormSubmit = useCallback(
    async (formData) => {
      // Basic client-side validation
      if (!formData.username.trim()) {
        toast.error("Tên người dùng không được để trống!");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Email không hợp lệ!");
        return;
      }

      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      } else if (editData.image) {
        data.append("image", editData.image);
      }

      setIsLoading(true);
      try {
        await updateProfile(data, user.accessToken, dispatch);
        toast.success("Cập nhật hồ sơ thành công!");
        setShowUpdateForm(false); // Hide form after successful update
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Cập nhật thất bại!";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, user, editData.image]
  );

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return toast.error("Vui lòng nhập đầy đủ mật khẩu cũ và mới.");
    }

    if (passwordData.newPassword.length < 6) {
      return toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
    }

    try {
      setIsLoading(true);
      await changePassword(passwordData, user.accessToken);
      toast.success("Đổi mật khẩu thành công!");
      setPasswordData({ currentPassword: "", newPassword: "" });
      setShowPasswordForm(false); // Hide form after successful password change
    } catch (err) {
      toast.error(err.message || "Đổi mật khẩu thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = (type) => {
    if (type === "update") {
      setShowUpdateForm(false);
    } else if (type === "password") {
      setShowPasswordForm(false);
    }
  };

  const fields = [
    {
      name: "username",
      label: "Tên người dùng",
      placeholder: "Nhập tên",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Nhập email",
      required: true,
      type: "email",
    },
    {
      name: "image",
      label: "Ảnh đại diện",
      type: "file",
      accept: "image/*",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      {isLoading && <p>Đang tải...</p>}

      <div className={cx("profile-card")}>
        <img
          src={
            editData.image
              ? `/uploads/${editData.image}`
              : "https://avatar-ex-swe.nixcdn.com/avatar/2022/08/23/b/8/3/d/1661244166367.jpg"
          }
          alt="Avatar"
          className={cx("avatar")}
        />
        <div className={cx("info-form")}>
          <div className={cx("info")}>
            <p>
              <strong>Tên:</strong> {editData.username || "Chưa cập nhật"}
            </p>
            <p>
              <strong>Email:</strong> {editData.email || "Chưa cập nhật"}
            </p>
          </div>
          <div className={cx("form")}>
            <div className={cx("form-section")}>
              <button
                onClick={() => setShowUpdateForm(true)}
                className={cx("toggle-button")}
                disabled={isLoading}
                aria-label="Hiển thị biểu mẫu cập nhật thông tin"
              >
                Cập nhật thông tin
              </button>
              {showUpdateForm && (
                <div className={cx("modal")}>
                  <div
                    className={cx("modal-overlay")}
                    onClick={() => handleCloseModal("update")}
                  ></div>
                  <div className={cx("modal-content")}>
                    <button
                      onClick={() => handleCloseModal("update")}
                      className={cx("modal-close")}
                      aria-label="Ẩn biểu mẫu cập nhật thông tin"
                    >
                      &times;
                    </button>
                    <h3>Cập nhật thông tin</h3>
                    <FormComponent
                      fields={fields}
                      initialData={editData}
                      onSubmit={handleFormSubmit}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={cx("form-section")}>
              <button
                onClick={() => setShowPasswordForm(true)}
                className={cx("toggle-button")}
                disabled={isLoading}
                aria-label="Hiển thị biểu mẫu đổi mật khẩu"
              >
                Đổi mật khẩu
              </button>
              {showPasswordForm && (
                <div className={cx("modal")}>
                  <div
                    className={cx("modal-overlay")}
                    onClick={() => handleCloseModal("password")}
                  ></div>
                  <div className={cx("modal-content")}>
                    <button
                      onClick={() => handleCloseModal("password")}
                      className={cx("modal-close")}
                      aria-label="Ẩn biểu mẫu đổi mật khẩu"
                    >
                      &times;
                    </button>
                    <h3>Đổi mật khẩu</h3>
                    <form
                      onSubmit={handleChangePassword}
                      className={cx("change-password-form")}
                    >
                      <div className={cx("form-group")}>
                        <label>Mật khẩu hiện tại</label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className={cx("form-group")}>
                        <label>Mật khẩu mới</label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? "Đang đổi..." : "Đổi mật khẩu"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
