import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormComponent.module.scss";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function FormComponent({ onSubmit, initialData = {}, fields = [] }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      // Nếu là input file thì lưu File object
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Lấy file đầu tiên
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData); // Gửi toàn bộ formData (có cả File nếu có)
      setFormData(initialData); // Reset lại form
    } else {
      toast.info("Chưa xử lý submit.");
    }
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className={cx("form-group")}>
          <label className={cx("label")}>{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={
              field.type === "file" ? undefined : formData[field.name] || ""
            }
            onChange={handleChange}
            placeholder={field.placeholder}
            className={cx("input")}
            required={field.required}
          />
        </div>
      ))}

      <button type="submit" className={cx("submit-btn")}>
        Gửi
      </button>
    </form>
  );
}

export default FormComponent;
