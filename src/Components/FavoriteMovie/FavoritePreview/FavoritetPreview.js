import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./FavoritePreview.module.scss";

import { Wrapper as PopperWrapper } from "../../Popper";
import Button from "../../Button";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function FavoritePreview({ data }) {
  return (
    <PopperWrapper>
      <div className={cx("preview")}>
        <header className={cx("header")}>
          {data?.image && (
            <img
              className={cx("avata")}
              src={`http://localhost:8300/uploads/${data.image}`}
              alt="Ảnh phim"
            />
          )}
          <Button blue>Follow</Button>
        </header>
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            <strong>{data?.name}</strong>
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          </h4>
          <Link to={`/movie/${data._id}`} className={cx("usename")}>
            {data?.moviename}
          </Link>
        </div>
        <p className="analytics">
          <span className={cx("value")}>
            {" "}
            <strong>{data?.releaseYear}</strong> follow
          </span>
          <span className={cx("value")}>
            <strong>3M</strong> like
          </span>
        </p>
      </div>
    </PopperWrapper>
  );
}

export default FavoritePreview;
