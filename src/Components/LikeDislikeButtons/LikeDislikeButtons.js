import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./LikeDislikeButtons.module.scss";

const cx = classNames.bind(styles);

function LikeDislikeButtons({ initialStatus = null, onVote }) {
  // initialStatus: 'like' | 'dislike' | null
  const [status, setStatus] = useState(initialStatus);

  const handleLike = () => {
    const newStatus = status === "like" ? null : "like";
    setStatus(newStatus);
    onVote?.(newStatus); // gọi API hoặc callback
  };

  const handleDislike = () => {
    const newStatus = status === "dislike" ? null : "dislike";
    setStatus(newStatus);
    onVote?.(newStatus); // gọi API hoặc callback
  };

  return (
    <div className={cx("vote-container")}>
      <button
        onClick={handleLike}
        className={cx("vote-button", { active: status === "like" })}
      >
        👍 Like
      </button>
      <button
        onClick={handleDislike}
        className={cx("vote-button", { active: status === "dislike" })}
      >
        👎 Dislike
      </button>
    </div>
  );
}

export default LikeDislikeButtons;
