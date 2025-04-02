import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import styles from "./Movie.module.scss";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useColor } from "../../hooks";
import { getoneMovie } from "../../rudux/apiRequest";

const cx = classNames.bind(styles);

function Movie() {
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const [Movie, setMovie] = useState(null);
  const color = useColor(id);
  const oneMovie = useSelector((state) => state.movies.onemovies?.oneMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    getoneMovie(dispatch, id);
  }, [id, dispatch]);

  useEffect(() => {
    if (oneMovie) {
      setMovie(oneMovie);
      setLoad(true);
    }
  }, [oneMovie]);

  return (
    <div className={cx("wrapper")}>
      {load && Movie && (
        <header
          className={cx("background-header")}
          style={{
            backgroundImage: `linear-gradient(to top, transparent, ${color} 650px)`,
          }}
        >
          <img
            className={cx("background-header_image")}
            src="https://i.scdn.co/image/ab67706f000000038c85da51f91d85f7b7294ed5"
            alt=""
          />
          <div className={cx("title-header")}>
            <span>Movie</span>
            <h1 className={cx("name-Movie")}>{Movie?.moviename}</h1>

            <span>
              {Movie?.description} | {Movie?.releaseYear}
            </span>
          </div>
        </header>
      )}
      <article className={cx("Movie")}>
        <div className={cx("header-Movie")}>
          <div className={cx("Movie-icon")}>
            <FontAwesomeIcon
              className={cx("Movie-icon-play")}
              icon={faCirclePlay}
            />
            <FontAwesomeIcon
              className={cx("Movie-icon-heart")}
              icon={faHeart}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export default Movie;
