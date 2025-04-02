import classNames from "classnames/bind";
import MoviesList from "../../Components/Layout/DefaultLayout/MoviesList/MoviesList";
import styles from "./Home.module.scss";

// import MoviesList from "../../Components/Layout/components/";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("wrapper")}>
      <MoviesList />
    </div>
  );
}

export default Home;
