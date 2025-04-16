import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

import styles from "./MovieItem.module.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function MovieItem({ data }) {
  console.log(data);
  return (
    <Link
      to={`/movie/${data?._id}`}
      className={cx("wrapper")}
      // onClick={() => dispatch(actions.setplaylistID(data.id))}
    >
      <div className={cx("cover-image")}>
        {data?.image && (
          <img
            className={cx("image")}
            src={`http://localhost:8300/uploads/${data?.image}`}
            alt="Ảnh phim"
          />
        )}
      </div>
      <FontAwesomeIcon className={cx("play-icon")} icon={faCirclePlay} />
      <div className={cx("title")}>{data.moviename}</div>
    </Link>
  );
}

export default MovieItem;
