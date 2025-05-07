import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { deleteMovie, getAllMovie } from "../../../../rudux/apiRequest";

import styles from "./MoviesList.module.scss";
import MovieItem from "../../../MovieItem";

const cx = classNames.bind(styles);

function MoviesList() {
  const listMovie = useSelector((state) => state.movies.movies?.allMovies);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredmovie, setFilteredmovies] = useState([]);

  const [MoviesResult, setMoviesResult] = useState([]);
  const [load, setload] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moviesPerPage = 12;
  useEffect(() => {
    getAllMovie(dispatch);

    setload(true);
  }, []);

  useEffect(() => {
    // Mỗi khi listmovies thay đổi, cập nhật danh sách được lọc
    setFilteredmovies(listMovie || []);
  }, [listMovie]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * moviesPerPage;
  const currentPagemovie = filteredmovie.slice(offset, offset + moviesPerPage);
  console.log(currentPagemovie);
  const pageCount = Math.ceil(filteredmovie.length / moviesPerPage);

  console.log(listMovie);

  return (
    <div className={cx("wrapper")}>
      <h1>List Moviess</h1>
      <div className={cx("Movies")}>
        {load &&
          listMovie?.map((data) => <MovieItem key={data._id} data={data} />)}
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={cx("pagination")}
        activeClassName={cx("active")}
        pageClassName={cx("page-item")}
        previousClassName={cx("page-prev")}
        nextClassName={cx("page-next")}
      />
    </div>
  );
}

export default MoviesList;
