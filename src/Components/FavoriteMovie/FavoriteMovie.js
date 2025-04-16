import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./FavoriteMovie.module.scss";
import FavoriteMovietitem from "./FavoriteMovieitem";
import { getAllfavorite } from "../../rudux/apiRequest";

const cx = classNames.bind(styles);

function FavoriteMovie({ label }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const favoriteMovies = useSelector(
    (state) => state.favorites?.favorites?.allfavorites?.favoriteMovies
  );
  console.log(favoriteMovies);

  const [isSeeAll, setIsSeeAll] = useState(false);
  const onSeeAllClick = () => setIsSeeAll(!isSeeAll);

  useEffect(() => {
    if (user?.accessToken) {
      getAllfavorite(dispatch, user?.accessToken);
    }
  }, [dispatch, user]);

  return (
    <div className={cx("wrapper", isSeeAll ? "see_all" : "")}>
      <p className={cx("label")}>{label}</p>
      <div className={cx("list-Favorite")}>
        {favoriteMovies?.map((movie) => (
          <FavoriteMovietitem key={movie._id} data={movie} />
        ))}
      </div>
      <p className={cx("more-btn")} onClick={onSeeAllClick}>
        See all
      </p>
    </div>
  );
}

FavoriteMovie.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FavoriteMovie;
