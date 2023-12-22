import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, getCommentsForPost } from '../../../redux/comment';
import { useParams } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import DeleteCommentModal from '../DeleteCommentModal';
import { calculateTimeDifference } from '../../MainPosts/PostComponent';
import "./CommentTile.css";

function CommentTile() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const comments = useSelector((state) => state.comments.postComments);
  const user = useSelector((state) => state.session.user);

  const setModal = (comment) => {
    return setModalContent(<DeleteCommentModal comment={comment} />);
  };

  const handleEditComment = (commentId) => {
    const updatedCommentData = {
      comment: commentText[+commentId] || '',
    };
    dispatch(editComment(+commentId, updatedCommentData));
    setCommentText((prevCommentText) => ({
      ...prevCommentText,
      [commentId]: '',
    }));
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [commentId]: false,
    }));
  };

  useEffect(() => {
    dispatch(getCommentsForPost(+postId));
    setLoading(false);
  }, [dispatch, postId]);

  if (loading) return <h1>...loading comments</h1>;

  return (
    <div>
      {!loading &&
        comments?.map((comment) => (
          <div key={comment.id}>
            <div className='User-Comment-Header'>
                <h5>{comment.User?.username}</h5>
                <span>&#8226;</span>
                <p>{calculateTimeDifference(comment.createdAt)}</p>
            </div>
            {isEditing[comment.id] ? (
              <div>
                <label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setCommentText((prevCommentText) => ({
                        ...prevCommentText,
                        [comment.id]: e.target.value,
                      }))
                    }
                    placeholder={comment.comment}
                  />
                </label>
                <button onClick={() => handleEditComment(comment.id)}>
                  Save Comment
                </button>
              </div>
            ) : (
              <div className='Comment-Section'>
                <p>{comment.comment}</p>
                {user && user.id === comment.userId && (
                    <div>
                        <button
                        onClick={() => {
                            setCommentText((prevCommentText) => ({
                            ...prevCommentText,
                            [comment.id]: comment.comment,
                            }));
                            setIsEditing((prevIsEditing) => ({
                            ...prevIsEditing,
                            [comment.id]: true,
                            }));
                        }}
                        >
                        Edit Comment
                        </button>
                        <button onClick={() => setModal(comment)}>Delete Comment</button>
                    </div>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CommentTile;
