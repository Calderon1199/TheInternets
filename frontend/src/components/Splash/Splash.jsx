import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment, deleteComment, editComment, getComments, getUserComments } from '../../redux/comment';

const Splash = () => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getComments());
  }, [])

  const edit = () => {
    dispatch(createComment(5, { comment: commentText }))
  }

  return (
    <div>
        <h1>Welcome To Capstone Express Starter</h1>
        <label>
          comment:
          <input type="text" onChange={(e) => setCommentText(e.target.value)} />
        </label>
        <button onClick={edit}>submit a comment</button>
    </div>
  );
}

export default Splash;
