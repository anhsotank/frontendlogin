import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faEye } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./Movie.module.scss";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useColor } from "../../hooks";
import { getoneMovie, increaseView } from "../../rudux/apiRequest";
import Comment from "../../Components/Comment/comment";
import Heart from "../../Components/Heart";

const cx = classNames.bind(styles);

function Movie() {
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const [Movie, setMovie] = useState(null);
  const color = useColor(id);
  const oneMovie = useSelector((state) => state.movies.onemovies?.oneMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    increaseView(dispatch, id);
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
          {Movie?.image && (
            <img
              className={cx("background-header_image")}
              src={`http://localhost:8300/uploads/${Movie.image}`}
              alt="Ảnh phim"
            />
          )}
          <div className={cx("title-header")}>
            <span>Movie</span>
            <h1 className={cx("name-Movie")}>{Movie?.moviename}</h1>

            <Tippy content={Movie?.description}>
              <span className={cx("description")}>
                {Movie?.description.length > 120
                  ? Movie?.description.slice(0, 120) + "..."
                  : Movie?.description}{" "}
                | {Movie?.releaseYear}
              </span>
            </Tippy>
            {Movie?.genre ? <span>genre : {Movie?.genre?.name}</span> : ""}
            <div className={cx("view-Movie")}>
              <FontAwesomeIcon icon={faEye} />
              {Movie?.views}
            </div>
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

            <Heart filmid={id} />
          </div>
        </div>
        <iframe
          className={cx("play-movie")}
          width="780"
          height="500"
          src={Movie?.srcVideo}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

        <Comment filmid={id} />
      </article>
    </div>
  );
}

export default Movie;
