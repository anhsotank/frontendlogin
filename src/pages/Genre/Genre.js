import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Genre.module.scss";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { getAllMoviebyGenre } from "../../rudux/apiRequest";
import MovieItem from "../../Components/MovieItem";

const cx = classNames.bind(styles);

function Genre() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ListMovie, setListMovie] = useState([]);
  const [load, setload] = useState(false);

  const listmovie = useSelector(
    (state) => state.genres?.movies?.allmovies?.listmovie
  );
  const genresname = useSelector(
    (state) => state.genres?.movies?.allmovies?.genresname
  );
  useEffect(() => {
    getAllMoviebyGenre(id, dispatch);
  }, [id]);

  useEffect(() => {
    if (listmovie) {
      setListMovie(listmovie);
      setload(true);
    }
  }, [listmovie]);

  return (
    <div className={cx("wrapper")}>
      {load && <h2>Thể loại : {genresname[0]?.name}</h2>}

      <div className={cx("Movies")}>
        {load &&
          ListMovie?.map((movie) => <MovieItem key={movie._id} data={movie} />)}
      </div>
    </div>
  );
}

export default Genre;
