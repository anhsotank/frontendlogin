import React from "react";

import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import styles from "./DarkMode.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };
  const setLightkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme === "dark") {
    setDarkMode();
  }
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightkMode();
  };

  return (
    <div className={cx("dark_mode")}>
      <input
        className={cx("dark_mode_input")}
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label className={cx("dark_mode_label")} htmlFor="darkmode-toggle">
        <Sun className={cx("sun")} />
        <Moon className={cx("moon")} />
      </label>
    </div>
  );
};

export default DarkMode;
