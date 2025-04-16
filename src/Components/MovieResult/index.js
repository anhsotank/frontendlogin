import classNames from "classnames/bind";
import styles from "./MovieResult.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function MovieResult({ data }) {
  return (
    <Link to={`/movie/${data._id}`} className={cx("wrapper")}>
      {/* onClick={() => dispatch(actions.setsong(data))} */}
      {data?.image && (
        <img
          className={cx("avata")}
          src={`http://localhost:8300/uploads/${data.image}`}
          alt="Ảnh phim"
        />
      )}

      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>{data.moviename}</span>
          {/* {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )} */}
        </h4>
      </div>
    </Link>
  );
}

export default MovieResult;
