import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../../redux/comment';

function CommentInputForm({user, postId}) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const handleCommentSubmit = () => {
        const newCommentData = { comment };
        dispatch(createComment(postId, newCommentData));
    }

    return (
        <div>
            <p>Comment as {user.username}</p>
            <div>
                <label>
                    <input type="text" onChange={(e) => setComment(e.target.value)} placeholder='What are your thoughts?'/>
                </label>
                <div>
                    <button type='submit' onClick={handleCommentSubmit}>Comment</button>
                </div>
            </div>
        </div>
    );
}

export default CommentInputForm;
