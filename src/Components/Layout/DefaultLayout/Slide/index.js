// import classNames from "classnames/bind";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import styles from "./Slide.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronCircleLeft,
//   faChevronCircleRight,
// } from "@fortawesome/free-solid-svg-icons";
// const cx = classNames.bind(styles);

// function SampleNextArrow(props) {
//   const { onClick } = props;

//   return (
//     <FontAwesomeIcon
//       icon={faChevronCircleRight}
//       className={cx("next-arr")}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { style, onClick } = props;
//   return (
//     <FontAwesomeIcon
//       className={cx("pre-arr")}
//       style={{
//         ...style,
//         display: "block",
//         background: "#f0f8ff",
//         color: " #e3e6eb",
//       }}
//       onClick={onClick}
//       icon={faChevronCircleLeft}
//     />
//   );
// }

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   pauseOnHover: true,
//   initialSlide: 0,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };
// function Slide() {
//   return (
//     <div className={cx("wrapper")}>
//       <Slider {...settings} className={cx("slick-slider")}>
//         <div className={cx("slick-slider_item")}>
//           <img
//             src="https://i.scdn.co/image/ab67706f000000038c85da51f91d85f7b7294ed5"
//             alt="aa"
//           />
//         </div>
//         <div className={cx("slick-slider_item")}>
//           <img
//             src="https://avatar-ex-swe.nixcdn.com/slideshow/2023/07/23/b/1/4/4/1690107379297_org.jpg"
//             alt="aa"
//           />
//         </div>
//         <div className={cx("slick-slider_item")}>
//           <img
//             src="https://i.scdn.co/image/ab67706f00000003163207c8107a08d4a480493e"
//             alt="aa"
//           />
//         </div>
//         <div className={cx("slick-slider_item")}>
//           <img
//             src="https://i.scdn.co/image/ab67706f00000003c8f79895bd1b71300c1c79f4"
//             alt="aa"
//           />
//         </div>
//         <div className={cx("slick-slider_item")}>
//           <img
//             src="https://i.scdn.co/image/ab67706f00000003bbb60aa9fef94f2270a335fd"
//             alt="aa"
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default Slide;
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecommentMovies } from "../../../../rudux/apiRequest";

import styles from "./Slide.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function NextArrow({ onClick }) {
  return (
    <button className={cx("next-arr")} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button className={cx("pre-arr")} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronCircleLeft} />
    </button>
  );
}

function Slide() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const recomment = useSelector(
    (state) => state.movies.recommentmovies?.recommentmovies,
  );

  const user = useSelector((state) => state.auth.login?.currentUser);

  // Ảnh mặc định khi chưa đăng nhập
  const defaultMovies = [
    {
      _id: 1,
      image: "https://i.scdn.co/image/ab67706f000000038c85da51f91d85f7b7294ed5",
    },
    {
      _id: 2,
      image: "https://i.scdn.co/image/ab67706f00000003bbb60aa9fef94f2270a335fd",
    },
    {
      _id: 3,
      image: "https://i.scdn.co/image/ab67706f00000003163207c8107a08d4a480493e",
    },
    {
      _id: 4,
      image: "https://i.scdn.co/image/ab67706f00000003c8f79895bd1b71300c1c79f4",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chỉ gọi API khi đã đăng nhập
        if (user?.accessToken) {
          await getRecommentMovies(dispatch, user.accessToken);
        }

        setLoad(true);
      } catch (err) {
        console.error("getRecommentMovies error:", err);
      }
    };

    fetchData();
  }, [dispatch, user]);

  // Nếu chưa đăng nhập thì dùng ảnh mặc định
  const movies =
    user?.accessToken && recomment?.length > 0 ? recomment : defaultMovies;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: movies?.length >= 3 ? 3 : movies?.length || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={cx("wrapper")}>
      <Slider {...settings}>
        {load &&
          movies?.map((movie) => (
            <Link
              key={movie._id}
              to={`/movie/${movie._id}`}
              className={cx("slick-slider_item")}
            >
              <img
                src={
                  movie.image.startsWith("http")
                    ? movie.image
                    : `http://localhost:8300/uploads/${movie.image}`
                }
                alt="movie"
                className={cx("poster-img")}
              />
            </Link>
          ))}
      </Slider>
    </div>
  );
}

export default Slide;
