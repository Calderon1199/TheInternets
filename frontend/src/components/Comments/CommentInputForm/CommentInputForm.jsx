import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { createComment } from '../../../redux/comment';
import { useModal } from '../../../context/Modal';
import LoginFormModal from '../../LoginFormModal';
import './CommentInputForm.css';

function CommentInputForm({postId}) {
    const user = useSelector(state => state.session?.user);
    const [comment, setComment] = useState("");
    const { setModalContent } = useModal();
    const dispatch = useDispatch();

    const handleCommentSubmit = () => {
        const newCommentData = { comment };
        dispatch(createComment(postId, newCommentData));
    }

    return (
        <div className='Comment-Input-Container'>
            <div className='Comment-User-Name'>
                {user ? (
                    <div className='Comment-Input-True'>
                        <p>Comment as </p>
                        <p id='userName'>{user?.username}</p>
                        <div className='Comment-Input'>
                            <label>
                                <textarea type="text" onChange={(e) => setComment(e.target.value)} placeholder='What are your thoughts?'></textarea>
                            </label>
                            <div className='Comment-Submit-Button'>
                                <button type='submit' onClick={handleCommentSubmit}>Comment</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p id='userName2' onClick={() => setModalContent(<LoginFormModal/>)}>Login to comment</p>
                )}
            </div>
            <div className='Search-Sort-Container'>
                <div className='Search-Sort-Inner-Container'>
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
