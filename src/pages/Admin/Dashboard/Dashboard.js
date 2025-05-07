import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { getTopMovies } from "../../../rudux/apiRequest";
import styles from "./Dashboard.module.scss";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const cx = classNames.bind(styles);
function Dashboard() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const data = await getTopMovies(); // đợi dữ liệu
      setTopMovies(data);
    };
    fetchTopMovies();
  }, []);

  const chartData = {
    labels: topMovies?.map((movie) => movie?.moviename),
    datasets: [
      {
        label: "Lượt xem",
        data: topMovies?.map((movie) => movie?.views),
        backgroundColor: "#2a8dfb",
        borderColor: "rgb(66, 128, 170)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={cx("dashboard-container")}>
      <h2>Top 5 phim được xem nhiều nhất</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default Dashboard;
