import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { editComment, getCommentsForPost } from '../../../redux/comment';
import { calculateTimeDifference } from '../../MainPosts/PostComponent';

import DeleteCommentModal from '../DeleteCommentModal';
import { useModal } from '../../../context/Modal';
import "./CommentTile.css";

function CommentTile({comments}) {
  const user = useSelector((state) => state.session.user);

  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const [loading, setLoading] = useState(true);

  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { postId } = useParams();


  const setModal = (comment) => {
    return setModalContent(<DeleteCommentModal comment={comment} />);
  };


  const handleEditComment = (commentId) => {
    const updatedCommentData = {
      comment: commentText,
    };
    dispatch(editComment(+commentId, updatedCommentData));
    setIsEditing((prevValue) => ({ ...prevValue, [commentId]: false}));
    setCommentText("");
  };

  useEffect(() => {
    dispatch(getCommentsForPost(+postId))
    .then(() => setLoading(false))
    .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
    });
  }, [dispatch, postId, user]);

  if (loading) return <h1>...loading comments</h1>;

    return (
        <div >
            {!loading &&
            comments?.map((comment) => (
                <div key={comment.id} className='Comment-Outer-Container'>
                <div className='User-Comment-Header'>
                    <h4>{comment.User?.username}</h4>
                    <span>&#8226;</span>
                    <p>{calculateTimeDifference(comment.createdAt)}</p>
                </div>
                {isEditing[comment.id] ? (
                    <div className='Edit-Comment-Textarea'>
                        <label>
                        <textarea
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={comment.comment}
                        ></textarea>
                        </label>
                        <div>
                            <button onClick={() => handleEditComment(comment.id)}>
                            Save Comment
                            </button>
                            <button onClick={() => setIsEditing((prevIsEditing) => ({
                                ...prevIsEditing,
                                [comment.id]: false,
                            }))}>
                            Cancel
                            </button>
                        </div>
                    </div>
                    ) : (
                    <div className='Comment-Container-2'>
                            <p id='comment-text'>{comment.comment}</p>
                        {user?.id === comment.userId && (
                        <div className='Option-Button-Container'>
                            <button onClick={() => setIsEditing((prevIsEditing) => ({
                                ...prevIsEditing,
                                [comment.id]: true,
                            }))}>
                            Edit Comment
                            </button>
                            <button onClick={() => setModal(comment)}>
                            Delete Comment
                            </button>
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
