import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./FormComponent.module.scss";
import { toast } from "react-toastify";
import Select from "react-select";

const cx = classNames.bind(styles);

function FormComponent({ onSubmit, initialData = {}, fields = [] }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData); // Khi editData thay đổi thì set lại dữ liệu form
  }, [initialData]);

  const handleChange = (e) => {
    const { name, type, value, files, multiple, options } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (multiple) {
      // Nếu là select multiple
      const selectedOptions = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
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
      onSubmit(formData);
      setFormData(initialData); // Reset lại nếu cần
    } else {
      toast.info("Chưa xử lý submit.");
    }
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className={cx("form-group")}>
          <label className={cx("label")}>{field.label}</label>

          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={cx("input")}
              required={field.required}
            >
              <option value="">-- Chọn --</option>
              {field?.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "multi-select" ? (
            <Select
              isMulti
              name={field.name}
              options={field.options}
              value={field.options?.filter((opt) =>
                formData[field.name]?.includes(opt.value)
              )}
              onChange={(selectedOptions) => {
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: selectedOptions.map((opt) => opt.value),
                }));
              }}
              className={cx("react-select")}
              classNamePrefix="select"
            />
          ) : (
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
          )}
        </div>
      ))}

      <button type="submit" className={cx("submit-btn")}>
        Gửi
      </button>
    </form>
  );
}

export default FormComponent;

// import React, { useState, useEffect } from "react";
// import classNames from "classnames/bind";
// import styles from "./FormComponent.module.scss";
// import { toast } from "react-toastify";

// const cx = classNames.bind(styles);

// function FormComponent({ onSubmit, initialData = {}, fields = [] }) {
//   const [formData, setFormData] = useState(initialData);

//   useEffect(() => {
//     setFormData(initialData); // Khi editData thay đổi thì set lại dữ liệu form
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, type, value, files, multiple, options } = e.target;

//     if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else if (multiple) {
//       // Nếu là select multiple
//       const selectedOptions = Array.from(options)
//         .filter((opt) => opt.selected)
//         .map((opt) => opt.value);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: selectedOptions,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (onSubmit) {
//       onSubmit(formData);
//       setFormData(initialData); // Reset lại nếu cần
//     } else {
//       toast.info("Chưa xử lý submit.");
//     }
//   };

//   return (
//     <form className={cx("form")} onSubmit={handleSubmit}>
//       {fields.map((field) => (
//         <div key={field.name} className={cx("form-group")}>
//           <label className={cx("label")}>{field.label}</label>

//           {field.type === "select" ? (
//             <select
//               name={field.name}
//               value={formData[field.name] || ""}
//               onChange={handleChange}
//               className={cx("input")}
//               required={field.required}
//             >
//               <option value="">-- Chọn --</option>
//               {field?.options?.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input
//               type={field.type || "text"}
//               name={field.name}
//               value={
//                 field.type === "file" ? undefined : formData[field.name] || ""
//               }
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={cx("input")}
//               required={field.required}
//             />
//           )}
//         </div>
//       ))}

//       <button type="submit" className={cx("submit-btn")}>
//         Gửi
//       </button>
//     </form>
//   );
// }

// export default FormComponent;
