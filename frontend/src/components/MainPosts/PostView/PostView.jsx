import React, { useEffect } from 'react';
import "./PostView.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../../../redux/post';


function PostView() {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts?.singlePost)

    useEffect(() => {
        dispatch(getSinglePost(+postId));
    }, [dispatch])

    return (
        <div>
            <div className='Post-Tile-Inner-Container'>
                    <h3>{post.title}</h3>
                    <p>{post.postText}</p>
                </div>
        </div>
    );
}

export default PostView;
