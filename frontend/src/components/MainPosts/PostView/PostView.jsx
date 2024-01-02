import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, editPost, getSinglePost } from '../../../redux/post';
import CommentInputForm from '../../Comments/CommentInputForm';
import CommentTile from '../../Comments/CommentTile';
import "./PostView.css";
import { calculateTimeDifference } from '../PostComponent';


function PostView() {
    const {postId} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.session?.user) || null;
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [postText, setPostText] = useState("");
    const post = useSelector(state => state.posts?.singlePost);

    useEffect(() => {
        dispatch(getSinglePost(+postId));
        setLoading(false)
    }, [dispatch, user])

    const deleteUserPost = (postId) => {
        dispatch(deletePost(+postId));
        navigate("/profile");
    }

    if (loading) {
        return (
        <h1>..loading</h1>
        )
    }


    return (
        <div className='Post-Back-Drop'>
            <div className='Single-Post-Container'>
                <div className='Single-Post-Inner-Container'>
                    <div className='Post-Info-Outer-Container'>
                        <div className='Single-Post-Info-Container'>
                            <p>Posted by {post.User?.username}</p>
                            <p>{calculateTimeDifference(post.createdAt)}</p>
                        </div>
                        <div className='Post-Text-Tile-Container'>
                            <h3 onClick={() => visitPost(post.id)}>{post.title}</h3>
                            {post.PostImages?.length > 0 && (
                                <img src={post.PostImages?.find((img) => img.preview === true)?.url} alt='Post Image'></img>
                            )}
                            <p className='Post-Text' onClick={() => visitPost(post.id)}>{post.postText}</p>
                        </div>
                        <div className='Single-Post-Buttons'>
                            <div className='Option-Button-Container'>
                                <button onClick={() => visitPost(post.id)}><i class="fa-regular fa-message"></i>{post?.Comments?.length}{post?.Comments?.length === 1 ? " Comment" : " Comments"}</button>
                            </div>
                            {post.userId === user?.id && (
                                <div className='Option-Button-Container'>
                                    <button onClick={() => deleteUserPost(post.id)}>Remove Post</button>
                                    <button onClick={() => navigate(`/posts/${post.id}`)}>Edit Post</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='Comment-Container'>
                        <CommentInputForm postId={postId} />
                        <CommentTile />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostView;
