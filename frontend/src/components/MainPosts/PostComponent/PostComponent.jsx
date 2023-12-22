import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatePostInput from '../CreatPost';
import { calculateTimeDifference } from '.';
import { deletePost, editPost } from '../../../redux/post';
import './PostComponent.css';

function PostTile({posts}) {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        setLoading(false)
    },[])

    const visitPost = (postId) => {
        navigate(`/posts/${+postId}`)
    }

    const editUserPost = (postId) => {
        const updatedPostData = {
            categoryId: 1,
            postText,
        }
        dispatch(editPost(postId, updatedPostData));
        setEditing(false);
        visitPost(postId);
    }

    const deleteUserPost = (postId) => {
        dispatch(deletePost(+postId));
    }

    return (
        <div className='Post-Tile-Container'>
            {user && (
                <CreatePostInput user={user}/>
            )}
            {!loading && posts?.map((post) => (
                <div className='Post-Tile-Inner-Container'>
                    <div className='Post-Info-Container'>
                        <h5>{post.Group.name}</h5>
                        <span>&#x2022;</span>
                        <p>Posted by {post.User.username}</p>
                        <p>{calculateTimeDifference(post.createdAt)}</p>
                    </div>
                    <div className='Post-Text-Tile-Container'>
                        <h3 onClick={() => visitPost(post.id)}>{post.title}</h3>
                        {editing ? (
                            <div>
                                <label>
                                    <input type="text" onChange={(e) => setPostText(e.target.value)} defaultValue={post.postText}/>
                                </label>
                                <button onClick={() => editUserPost(post.id)}>Post</button>
                            </div>
                        ): (
                            <p className='Post-Text' onClick={() => visitPost(post.id)}>{post.postText}</p>
                        )}
                    </div>
                    <div className='Post-Buttons'>
                        <div className='Option-Button-Container'>
                            <button onClick={() => visitPost(post.id)}>{post.Comments.length}{post.Comments.length === 1 ? " Comment" : " Comments"}</button>
                        </div>
                        {post.userId === user.id && (
                            <div className='Option-Button-Container'>
                                <button onClick={() => deleteUserPost(post.id)}>Remove Post</button>
                                <button onClick={() => setEditing(true)}>Edit Post</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostTile;
