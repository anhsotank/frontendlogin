import config from "../config";
import { AdminLayout, HeaderOnly, HeaderSidebar } from "../Components/Layout";
import Home from "../pages/Home";
import Following from "../pages/Following";
import Update from "../pages/Update";
import Login from "../pages/Login/Login";
// import Login from "../Components/Login/Login";

import Register from "../pages/Register/Register";
import Live from "../pages/Live";
import Movie from "../pages/Movie";
import { ManageMovie, ManageUser } from "../pages/Admin";

const publicroutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.update, component: Update, layout: HeaderOnly },
  { path: config.routes.movie, component: Movie, layout: HeaderSidebar },

  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
  { path: config.routes.live, component: Live },
];
const privateroutes = [
  {
    path: config.routes.manageuser,
    component: ManageUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.managemovie,
    component: ManageMovie,
    layout: AdminLayout,
  },
];
export { publicroutes, privateroutes };
