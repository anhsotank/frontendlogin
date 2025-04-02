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
      <img
        className={cx("avata")}
        src="https://i.scdn.co/image/ab67706f000000038c85da51f91d85f7b7294ed5"
      />

      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>{data.moviename}</span>
          {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </h4>
      </div>
    </Link>
  );
}

export default MovieResult;
