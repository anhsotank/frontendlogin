import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CommentSection.css";

// Action Types
const ADD_COMMENT = "ADD_COMMENT";
const FETCH_COMMENTS = "FETCH_COMMENTS";

// Action Creators
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const fetchComments = (filmId) => ({
  type: FETCH_COMMENTS,
  payload: filmId,
});

// Reducer
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_COMMENTS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${FETCH_COMMENTS}_FULFILLED`:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case `${FETCH_COMMENTS}_REJECTED`:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
};

// Component
const Comment = ({ filmId }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(filmId));
  }, [dispatch, filmId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      id: Date.now(),
      filmId,
      content: newComment,
      rating,
      username: "User", // Thường sẽ lấy từ authentication state
      date: new Date().toISOString(),
    };

    dispatch(addComment(comment));
    setNewComment("");
    setRating(5);
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= count ? "filled" : "empty"}`}
          onClick={() => setRating(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading)
    return <div className="comment-section loading">Đang tải bình luận...</div>;
  if (error) return <div className="comment-section error">Lỗi: {error}</div>;

  return (
    <div className="comment-section">
      <h3 className="comment-section__title">Bình luận phim</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="rating-selector">
          <label>Đánh giá của bạn:</label>
          <div className="stars-container">{renderStars(rating)}</div>
        </div>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nhập bình luận của bạn về bộ phim..."
          rows={4}
        />
        <button className="submit-button" type="submit">
          Gửi bình luận
        </button>
      </form>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="username">{comment.username}</span>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
                <div className="comment-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${
                        i < comment.rating ? "filled" : "empty"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
