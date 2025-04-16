import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Menu, { Menuitem } from "./Menu";
import config from "../../../../config";
import {
  faHome,
  faUser,
  faVideoCamera,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import FavoriteMovie from "../../../FavoriteMovie/FavoriteMovie";
// import SuggestedAccounts from '~/components/suggestedAccounts/SuggestedAccounts';
const cx = classNames.bind(styles);
function Sidebar({ role }) {
  const menu_item = [
    {
      icon: <FontAwesomeIcon icon={faHome} />,
      title: "For Your",
      to: config.routes.home,
    },
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "Follwing",
      to: config.routes.following,
    },
    {
      icon: <FontAwesomeIcon icon={faVideoCamera} />,
      title: "Live",
      to: config.routes.live,
    },
  ];

  const adminmenu_item = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "manage users",
      to: config.routes.manageuser,
    },
    {
      icon: <FontAwesomeIcon icon={faFilm} />,
      title: "manage movies",
      to: config.routes.managemovie,
    },
  ];

  console.log(role);
  return (
    <aside className={cx("wrapper")}>
      <Menu>
        {role === "user"
          ? menu_item.map((e, index) => (
              <Menuitem key={index} title={e.title} to={e.to} icon={e.icon} />
            ))
          : adminmenu_item.map((e, index) => (
              <Menuitem key={index} title={e.title} to={e.to} icon={e.icon} />
            ))}
      </Menu>
      {role === "user" ? (
        <FavoriteMovie label="Favorite movies" />
      ) : (
        <title>Hi Admin</title>
      )}
    </aside>
  );
}

export default Sidebar;
