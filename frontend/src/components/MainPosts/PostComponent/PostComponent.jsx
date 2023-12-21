import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, editPost } from '../../../redux/post';
import './PostComponent.css';
import CreatePostInput from '../CreatPost';
import { useNavigate } from 'react-router-dom';

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
                    <div>
                        <h3 onClick={() => visitPost(post.id)}>{post.title}</h3>
                        {editing ? (
                            <div>
                                <label>
                                    <input type="text" onChange={(e) => setPostText(e.target.value)} defaultValue={post.postText}/>
                                </label>
                                <button onClick={() => editUserPost(post.id)}>Post</button>
                            </div>
                        ): (
                            <p onClick={() => visitPost(post.id)}>{post.postText}</p>
                        )}
                        <div>
                            <button onClick={() => visitPost(post.id)}>{post.Comments.length}{post.Comments.length === 1 ? "Comment" : "Comments"}</button>
                        </div>
                    </div>
                    {post.userId === user.id && (
                        <div>
                            <button onClick={() => deleteUserPost(post.id)}>Remove Post</button>
                            <button onClick={() => setEditing(true)}>Edit Post</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostTile;
