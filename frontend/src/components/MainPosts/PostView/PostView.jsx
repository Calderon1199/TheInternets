import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { deletePost, getSinglePost } from '../../../redux/post';
import CommentInputForm from '../../Comments/CommentInputForm';
import CommentTile from '../../Comments/CommentTile';

import { calculateTimeDifference } from '../PostComponent';
import "./PostView.css";


function PostView() {
    const post = useSelector(state => state.posts?.singlePost);
    const user = useSelector(state => state.session.user);

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {postId} = useParams();

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
                            <h3 onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</h3>
                            {post.PostImages?.length > 0 && (
                                <img src={post.PostImages?.find((img) => img.preview === true)?.url} alt='Post Image'></img>
                            )}
                            <p className='Post-Text' onClick={() => navigate(`/posts/${post.id}`)}>{post.postText}</p>
                        </div>
                        <div className='Single-Post-Buttons'>
                            <div className='Option-Button-Container'>
                                <button onClick={() => navigate(`/posts/${post.id}`)}><i className="fa-regular fa-message"></i>{post?.Comments?.length}{post?.Comments?.length === 1 ? " Comment" : " Comments"}</button>
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
