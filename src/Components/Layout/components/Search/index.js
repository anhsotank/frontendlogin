import {
  faCircleXmark,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../Popper";
import { searchMovie } from "../../../../rudux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

import MovieResult from "../../../MovieResult";
import { useDebounce } from "../../../../hooks";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResultMovie, setSearchResultMovie] = useState([]);
  // khởi tạo false — popup chỉ hiện khi user focus và có value
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 700);
  const inputRef = useRef();
  const dispatch = useDispatch();

  // Kết quả tìm kiếm lưu ở Redux; có thể là mảng rỗng
  const listMovie = useSelector(
    (state) => state.movies?.searchmovies?.resultMovies,
  );

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResultMovie([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // gọi action async; kết quả sẽ cập nhật Redux slice
    searchMovie(debounced, dispatch).then(() => setLoading(false));
  }, [debounced, dispatch]);

  // Đồng bộ result từ Redux vào local
  useEffect(() => {
    setSearchResultMovie(listMovie || []);
    // ẩn popup nếu không có value hoặc kết quả rỗng
    if (!searchValue.trim() || !(listMovie && listMovie.length > 0)) {
      setShowResult(false);
    }
  }, [listMovie, searchValue]);

  return (
    <div>
      <HeadlessTippy
        visible={
          showResult &&
          searchValue.trim().length > 0 &&
          searchResultMovie?.length > 0
        }
        interactive
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h3 className={cx("title-account")}>Movie Recommendations</h3>
              {searchResultMovie?.map((result) => (
                <MovieResult key={result._id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setShowResult(false)}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="Search movies..."
            spellCheck="false"
            onChange={(e) => {
              setSearchValue(e.target.value);
              // nếu input có text, bật showResult để chờ kết quả
              if (e.target.value.trim()) {
                setShowResult(true);
              } else {
                setShowResult(false);
                setSearchResultMovie([]);
              }
            }}
            onFocus={() => {
              // chỉ show khi có giá trị
              if (searchValue.trim() && searchResultMovie.length > 0) {
                setShowResult(true);
              }
            }}
          />
          {!!searchValue && !loading && (
            <button
              className={cx("clear")}
              onClick={() => {
                setSearchValue("");
                setSearchResultMovie([]);
                setShowResult(false);
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()} // ngăn form submit nếu trong form
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
