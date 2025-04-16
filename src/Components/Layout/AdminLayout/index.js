import classNames from "classnames/bind";
import Sidebar from "../DefaultLayout/Sidebar";

import styles from "./AdminLayout.module.scss";
import Header from "../components/Header";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  let role = "admin";

  return (
    <div className={cx("wrapper")}>
      <Header />

      <div className={cx("container")}>
        <Sidebar role={role} />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
