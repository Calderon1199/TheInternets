import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsForPost } from '../../../redux/comment';
import { useParams } from 'react-router-dom';

function CommentTile() {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const comments = useSelector(state => state.comments.postComments);

    useEffect(() => {
        dispatch(getCommentsForPost(+postId))
        setLoading(false);
    }, [dispatch]);

    if (loading) (
        <h1>...loading comments</h1>
    )
    return (
        <div>
            {!loading && comments?.map((comment) => (
                <div>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentTile;
