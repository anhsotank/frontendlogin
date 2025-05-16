import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
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
import { getAllGenres, getProfile } from "../../../../rudux/apiRequest";
import DarkMode from "../../../DarkMode";

const cx = classNames.bind(styles);

function Header() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const listgenres = useSelector((state) => state.genres.genres?.allgenres);
  const profile = useSelector((state) => state.users.users?.profile);

  console.log(listgenres);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      await getAllGenres(dispatch);
      await getProfile(currentUser?.accessToken, dispatch);
    };
    fetch();
  }, [dispatch]);
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
      to: "/profile",
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

  //list genre
  const genreMenuItems =
    listgenres?.map((genre) => ({
      title: genre.name,
      to: `/genre/${genre._id}`,
    })) || [];
  console.log(genreMenuItems);

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
          {/* <Tippy content="upload" placement="bottom">
            <button className={cx("btn-upload")}>
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </button>
          </Tippy> */}
          <Menu item={genreMenuItems} onChange={handlemunuitem}>
            <button className={cx("btn-genre")}>
              genre
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </Menu>
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
                src={
                  profile?.image
                    ? `/uploads/${profile?.image}`
                    : "https://avatar-ex-swe.nixcdn.com/avatar/2022/08/23/b/8/3/d/1661244166367.jpg"
                }
                alt="Avatar"
                className={cx("user-avata")}
              />
            ) : (
              // <img
              //   className={cx("user-avata")}
              //   src="https://avatar-ex-swe.nixcdn.com/avatar/2022/08/23/b/8/3/d/1661244166367.jpg"
              // />
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
