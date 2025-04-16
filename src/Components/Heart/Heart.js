import classNames from "classnames/bind";
import styles from "./Heart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, deletefavorite } from "../../rudux/apiRequest";

const cx = classNames.bind(styles);

function Heart({ filmid }) {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const favorites = useSelector(
    (state) => state.favorites?.favorites?.allfavorites?.favoriteMovies
  );
  console.log(favorites, filmid);
  useEffect(() => {
    // Kiểm tra nếu phim đã có trong danh sách yêu thích
    const liked = favorites?.some((movie) => movie._id === filmid);
    console.log(liked);
    setIsLike(liked);
  }, [favorites, filmid]);

  const handleLikeClick = async () => {
    if (!user) return alert("Bạn cần đăng nhập để thêm vào yêu thích!");

    if (isLike) {
      // Đã thích => xóa khỏi yêu thích
      await deletefavorite(filmid, user?.accessToken, dispatch);
    } else {
      // Chưa thích => thêm vào yêu thích
      await addfavorite(filmid, user?.accessToken, dispatch);
    }

    setIsLike(!isLike);
  };

  return (
    <button className={cx("wrapper")} onClick={handleLikeClick}>
      <FontAwesomeIcon
        className={cx("icon-heart", isLike ? "blue" : "")}
        icon={faHeart}
      />
    </button>
  );
}

export default Heart;
