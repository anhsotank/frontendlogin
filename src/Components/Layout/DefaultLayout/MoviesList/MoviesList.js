import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteMovie, getAllMovie } from "../../../../rudux/apiRequest";

import styles from "./MoviesList.module.scss";
import MovieItem from "../../../MovieItem";

const cx = classNames.bind(styles);

function MoviesList() {
  const listMovie = useSelector((state) => state.movies.movies?.allMovies);

  const [MoviesResult, setMoviesResult] = useState([]);
  const [load, setload] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getAllMovie(dispatch);

    setload(true);
  }, []);

  console.log(listMovie);

  return (
    <div className={cx("wrapper")}>
      <h1>List Moviess</h1>
      <div className={cx("Movies")}>
        {load &&
          listMovie?.map((data) => <MovieItem key={data._id} data={data} />)}
      </div>
    </div>
  );
}

export default MoviesList;
