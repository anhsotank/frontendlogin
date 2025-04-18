import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCloudArrowUp,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import config from "../../../../config";
import styles from "./Header.module.scss";
import logo from "./../../../../assets/logo/logo_new.png";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
import Search from "../Search";
import { Link } from "react-router-dom";

import DarkMode from "../../../DarkMode";

const cx = classNames.bind(styles);

function Header() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const menu_item = [
    {
      icon: <FontAwesomeIcon icon={faEarthAsia} />,
      title: "English",
      children: {
        title: "Language",
        data: [
          {
            code: "e",
            title: "English",
          },
          {
            code: "vn",
            title: "viet nam",
          },
        ],
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: "Feedback",
      to: "/feedback",
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: "keyboar",
    },
  ];
  const useMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: ` ${currentUser?.username}`,
      to: "/anh",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Setting",
      to: "/setting",
    },
    ...menu_item,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/login",
    },
  ];
  //handle logic
  const handlemunuitem = (menuitem) => {
    console.log(menuitem);
  };
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={config.routes.home}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <Search />

        <div className={cx("action")}>
          <Tippy content="upload" placement="bottom">
            <button className={cx("btn-update")}>
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </button>
          </Tippy>
          <DarkMode></DarkMode>

          {currentUser ? (
            <></>
          ) : (
            <>
              <Button outline to={config.routes.register}>
                Sign up
              </Button>
              <Button blue to={config.routes.login}>
                Login
              </Button>
            </>
          )}
          <Menu
            item={currentUser ? useMenu : menu_item}
            onChange={handlemunuitem}
          >
            {currentUser ? (
              <img
                className={cx("user-avata")}
                src="https://avatar-ex-swe.nixcdn.com/avatar/2022/08/23/b/8/3/d/1661244166367.jpg"
              />
            ) : (
              <button className={cx("btn-more")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
