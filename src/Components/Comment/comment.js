import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  getAllComment,
  deleteComment,
  updateComment,
} from "../../rudux/apiRequest";
import "./comment.scss";

const Comment = ({ filmid }) => {
  const [newComment, setNewComment] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const dispatch = useDispatch();
  const { allComments, isfetching, error } = useSelector(
    (state) => state.comments.comments
  );
  const a = useSelector((state) => state.comments.comments);
  console.log(a);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userFB = useSelector((state) => state.auth.loginFB?.currentUser);
  const currentUser = user || userFB;

  const currentUserId = currentUser?._id;

  useEffect(() => {
    getAllComment(dispatch, filmid);
  }, [dispatch, filmid, refreshComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      text: newComment,

      movie: filmid,
      user: currentUserId, // ID người dùng hiện tại
    };

    await addComment(comment, currentUser?.accessToken, filmid, dispatch);
    setRefreshComments((prev) => !prev);
    setNewComment("");
  };

  const handleDelete = async (commentId) => {
    await deleteComment(currentUser?.accessToken, commentId, dispatch);
    setRefreshComments((prev) => !prev);
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditedContent(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    if (editedContent.trim() === "") return;
    // dispatch(updateComment({ commentId, content: editedContent }));
    await updateComment(
      commentId,
      editedContent,
      currentUser?.accessToken,
      dispatch
    );
    setEditingCommentId(null);
    setEditedContent("");
    setRefreshComments((prev) => !prev);
  };

  return (
    <div className="comment-section">
      <h3 className="comment-section__title">Bình luận phim</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nhập bình luận..."
          rows={4}
        />
        <button className="submit-button" type="submit">
          Gửi bình luận
        </button>
      </form>
      <div className="comments-list">
        {isfetching ? (
          <p>Đang tải bình luận...</p>
        ) : error ? (
          <p className="error">Lỗi: {error}</p>
        ) : allComments?.comments?.length === 0 ? (
          <p>Chưa có bình luận nào.</p>
        ) : (
          allComments?.comments?.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-header">
                <span className="username">{comment?.user?.username}</span>
                <span className="comment-date">
                  {new Date(comment?.createdAt).toLocaleDateString()}
                </span>
                {comment.user._id === currentUserId && (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(comment)}
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(comment._id)}
                    >
                      ❌ Xóa
                    </button>
                  </>
                )}
              </div>
              {editingCommentId === comment._id ? (
                <div className="edit-section">
                  <textarea
                    className="edit-input"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={3}
                  />
                  <button
                    className="save-button"
                    onClick={() => handleSaveEdit(comment._id)}
                  >
                    💾 Lưu
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setEditingCommentId(null)}
                  >
                    ❌ Hủy
                  </button>
                </div>
              ) : (
                <p className="comment-content">{comment.text}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
