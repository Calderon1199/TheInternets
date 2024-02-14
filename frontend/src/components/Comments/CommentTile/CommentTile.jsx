import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { editComment, getCommentsForPost, getUserComments } from '../../../redux/comment';
import { calculateTimeDifference } from '../../MainPosts/PostComponent';

import DeleteCommentModal from '../DeleteCommentModal';
import { useModal } from '../../../context/Modal';
import "./CommentTile.css";

function CommentTile({comments, isProfile}) {
  const user = useSelector((state) => state.session.user);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();


  const handleCommentChange = (comment) => {
        setCommentText(comment);
        const newErrors = { ...errors };

        if (comment.length === 0 ){
            newErrors.comment = '';
        }
        else if (comment.startsWith(' ')) {
            newErrors.comment = 'Comment cannot start with spaces';
        } else if (comment.length < 3) {
            newErrors.comment = 'Comment must be longer';
        } else {
            newErrors.comment = '';
        }
        setErrors(newErrors);

        comment.length >= 3  && !comment.startsWith(' ') ? setButtonDisabled(false) : setButtonDisabled(true);
    }


  const handleEditComment = (commentId) => {
    const updatedCommentData = {
      comment: commentText,
    };
    dispatch(editComment(+commentId, updatedCommentData));
    setIsEditing((prevValue) => ({ ...prevValue, [commentId]: false}));
    setCommentText("");
    setButtonDisabled(true);
  };

  useEffect(() => {
        if (isProfile) {
            dispatch(getUserComments());
        } else {
            dispatch(getCommentsForPost(+postId))
        }
        setLoading(false)

  }, [dispatch, postId, user]);

//   if (loading) return <img src='../Rolling-1s-200px.svg'></img>;

    return (
        <div className={!isProfile ? 'Comment-Container-Outside': 'Comment-Container-Outside-Profile'}>
            {!loading ?
             comments?.map((comment) => (
                <div key={comment.id} className='Comment-Outer-Container'>
                    {isProfile && (
                        <div className='Comment-Title' onClick={() => navigate(`/posts/${comment.postId}`)}>
                            <p>{comment.User?.username} commented on {comment.Post?.title}</p>
                        </div>
                    )}
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
                            onChange={(e) => handleCommentChange(e.target.value)}
                        ></textarea>
                        </label>
                        <div className='Comment-Buttons-Container'>
                            <button id={buttonDisabled ? 'submit-edit-post-disabled' : 'submit-edit-post-enabled' }disabled={buttonDisabled} onClick={() => handleEditComment(comment.id)}>
                            Save Comment
                            </button>
                            <button id='cancel-button2' onClick={() => setIsEditing((prevIsEditing) => ({
                                ...prevIsEditing,
                                [comment.id]: false,
                            }))}>
                            Cancel
                            </button>
                            {errors.comment && <p className="errorDiv" id="comment-error3">{errors.comment}</p>}
                        </div>
                    </div>
                    ) : (
                    <div className='Comment-Container-2'>
                            <p id='comment-text'>{comment.comment}</p>
                        {user?.id === comment.userId && (
                        <div className='Option-Button-Container'>
                            <button onClick={() => {
                                setIsEditing((prevIsEditing) => ({
                                    ...prevIsEditing,
                                    [comment.id]: true,
                                }));
                                setCommentText(comment.comment);
                                setButtonDisabled(false);
                            }}>
                                Edit Comment
                            </button>
                            <button onClick={() => setModalContent(<DeleteCommentModal comment={comment}/>)}>
                            Delete Comment
                            </button>
                        </div>
                        )}
                    </div>
                    )}
                </div>
            )): (
                <div className='Comment-Load'>
                    <img src='../Rolling-1s-200px.svg'></img>
                </div>
            )}
        </div>
    );
}

export default CommentTile;
