import classNames from "classnames/bind";
import Sidebar from "../DefaultLayout/Sidebar";

import styles from "./HeaderSidebar.module.scss";
import Header from "../components/Header";

const cx = classNames.bind(styles);

function HeaderSidebar({ children }) {
  let role = "user";

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

export default HeaderSidebar;
