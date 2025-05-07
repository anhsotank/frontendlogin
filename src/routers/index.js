import config from "../config";
import { AdminLayout, HeaderOnly, HeaderSidebar } from "../Components/Layout";
import Home from "../pages/Home";
import Following from "../pages/Following";
import Update from "../pages/Update";
import Genre from "../pages/Genre";
import Login from "../pages/Login/Login";
// import Login from "../Components/Login/Login";

import Register from "../pages/Register/Register";
import Live from "../pages/Live";
import Movie from "../pages/Movie";
import {
  ManageMovie,
  ManageUser,
  ManageGenre,
  ManageActor,
  Dashboard,
} from "../pages/Admin";

const publicroutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.update, component: Update, layout: HeaderOnly },
  { path: config.routes.movie, component: Movie, layout: HeaderSidebar },
  { path: config.routes.genre, component: Genre, layout: HeaderOnly },
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
  {
    path: config.routes.managegenre,
    component: ManageGenre,
    layout: AdminLayout,
  },
  {
    path: config.routes.manageactor,
    component: ManageActor,
    layout: AdminLayout,
  },
  {
    path: config.routes.dashboard,
    component: Dashboard,
    layout: AdminLayout,
  },
];
export { publicroutes, privateroutes };
