import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../redux/post';
import './PostComponent.css';
import CreatePostInput from '../CreatPost';
import { useNavigate } from 'react-router-dom';

function PostTile({posts}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    console.log(user, 'useeeeeeeeeeeer')

    const visitPost = (postId) => {
        navigate(`/posts/${+postId}`)
    }

    const deleteUserPost = (postId) => {
        dispatch(deletePost(+postId));
    }

    return (
        <div className='Post-Tile-Container'>
            {user && (
                <CreatePostInput user={user}/>
            )}
            {posts?.map((post) => (
                <div className='Post-Tile-Inner-Container'>
                    <div onClick={() => visitPost(post.id)}>
                        <h3>{post.title}</h3>
                        <p>{post.postText}</p>

                        <div>
                            <button>{post.Comments.length}{post.Comments.length === 1 ? "Comment" : "Comments"}</button>
                        </div>
                    </div>
                    {post.userId === user.id && (
                        <button onClick={() => deleteUserPost(post.id)}>Remove Post</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostTile;
