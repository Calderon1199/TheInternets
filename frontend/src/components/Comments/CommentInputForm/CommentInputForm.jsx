import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../redux/comment';
import './CommentInputForm.css';

function CommentInputForm({postId}) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const user = useSelector(state => state.session?.user);

    const handleCommentSubmit = () => {
        const newCommentData = { comment };
        dispatch(createComment(postId, newCommentData));
    }

    return (
        <div className='Comment-Input-Container'>
            <div className='Comment-User-Name'>
                {user ? (
                    <div>
                        <p>Comment as </p>
                        <p id='userName'>{user.username}</p>
                    </div>
                ) : (
                    <p>Login to comment</p>
                )}
            </div>
            <div className='Comment-Input'>
                <label>
                    <input type="text" onChange={(e) => setComment(e.target.value)} placeholder='What are your thoughts?'/>
                </label>
                <div className='Comment-Submit-Button'>
                    <button type='submit' onClick={handleCommentSubmit}>Comment</button>
                </div>
            </div>
            <div className='Search-Sort-Container'>
                <div className='Search-Sort-Inner-Container'>
                    <label id ="sort-label" for="sort">Sort By:</label>
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
