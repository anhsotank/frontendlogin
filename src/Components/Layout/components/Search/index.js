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
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 700);
  const inputRef = useRef();
  const dispatch = useDispatch();

  // Đảm bảo state đúng với Redux slice
  const listMovie = useSelector(
    (state) => state.movies?.searchmovies?.resultMovies
  );

  console.log("Kết quả tìm kiếm từ Redux:", listMovie);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResultMovie([]);
      return;
    }

    setLoading(true);
    searchMovie(debounced, dispatch).then(() => setLoading(false));
  }, [debounced, dispatch]);

  useEffect(() => {
    setSearchResultMovie(listMovie || []);
  }, [listMovie]);

  return (
    <div>
      <HeadlessTippy
        visible={showResult && searchResultMovie?.length > 0}
        interactive
        render={(atb) => (
          <div className={cx("search-result")} tabIndex="-1" {...atb}>
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
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button
              className={cx("clear")}
              onClick={() => {
                setSearchValue("");
                setSearchResultMovie([]);
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
