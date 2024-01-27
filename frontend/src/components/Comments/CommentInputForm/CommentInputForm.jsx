import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { createComment } from '../../../redux/comment';
import { useModal } from '../../../context/Modal';
import LoginFormModal from '../../LoginFormModal';
import './CommentInputForm.css';
import { getSinglePost } from '../../../redux/post';
import { useNavigate } from 'react-router-dom';

function CommentInputForm({postId}) {
    const user = useSelector(state => state.session?.user);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const { setModalContent } = useModal();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleCommentChange = (comment) => {
        setComment(comment);
        const newErrors = { ...errors };

        if (comment.length === 0 ){
            newErrors.comment = '';
        }
        else if (comment.startsWith(' ')) {
            newErrors.comment = 'Comment cannot start with spaces';
        } else if (comment.length < 2) {
            newErrors.comment = 'Comment must be longer';
        } else {
            newErrors.comment = '';
        }
        setErrors(newErrors);

        comment.length > 2  && !comment.startsWith(' ') ? setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleCommentSubmit = () => {
        const newCommentData = { comment: comment.trim() };
        setComment('');
        setButtonDisabled(true);
        dispatch(createComment(postId, newCommentData))
        .then(() => {
            dispatch(getSinglePost(postId));
        })
    }

    return (
        <div className='Comment-Input-Container'>
            <div className='Comment-User-Name'>
                {user ? (
                    <div className='Comment-Input-True'>
                        <div className='Comment-As-User'>
                            <p>Comment as </p>
                            <p id='userName' onClick={() => navigate('/profile')}>{user?.username}</p>
                        </div>
                        <div className='Comment-Input'>
                            <label>
                                <textarea type="text" onChange={(e) => handleCommentChange(e.target.value)} value={comment} placeholder='What are your thoughts?'></textarea>
                            </label>
                            <div className='Comment-Submit-Button'>
                                {errors.comment && <p className="errorDiv" id="comment-error">{errors.comment}</p>}
                                <button type='submit' className={buttonDisabled ? 'disabled': 'enabled'} disabled={buttonDisabled} onClick={handleCommentSubmit}>Comment</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p id='userName2' onClick={() => setModalContent(<LoginFormModal/>)}>Login to comment</p>
                )}
            </div>
            <div className='Search-Sort-Container'>
                <div className='Search-Sort-Inner-Container' onClick={() => alert("feature coming soon...")}>
                    <label id ="sort-label" htmlFor="sort">Sort By:</label>
                    <select name="sort" id="sort-comments">
                        <option value="Best">Best</option>
                        <option value="Recent">Recent</option>
                        <option value="Top">Top</option>
                    </select>
                    <span>|</span>
                    <div>
                        search
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentInputForm;
