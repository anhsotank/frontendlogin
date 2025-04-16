import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./FavoriteMovie.module.scss";
import FavoritePreview from "./FavoritePreview/FavoritetPreview";

const cx = classNames.bind(styles);
function FavoriteMovietitem({ data }) {
  return (
    <div>
      <Tippy
        interactive
        delay={[1000, 0]}
        placement="bottom"
        render={(props) => (
          <div tabIndex="-1" {...props}>
            <FavoritePreview data={data} />
          </div>
        )}
      >
        <Link to={`/movie/${data._id}`} className={cx("favorite-item")}>
          {data?.image && (
            <img
              className={cx("avata")}
              src={`http://localhost:8300/uploads/${data.image}`}
              alt="Ảnh phim"
            />
          )}

          <div className={cx("info")}>
            <h4 className={cx("name")}>
              <strong>{data?.moviename}</strong>
              <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
            </h4>
            <span className={cx("usename")}>{data?.moviename}</span>
          </div>
        </Link>
      </Tippy>
    </div>
  );
}

export default FavoriteMovietitem;
