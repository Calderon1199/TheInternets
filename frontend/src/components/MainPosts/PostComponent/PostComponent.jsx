import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/post';
import './PostComponent.css';
import CreatePostInput from '../CreatPost';
import { useNavigate } from 'react-router-dom';

function PostTile({posts}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allPosts = useSelector(state => state.posts.allPosts);
    const user = useSelector(state => state.session.user)
    console.log(allPosts, 'ALL POSTS/POST TILE COMPONENT');

    const visitPost = (postId) => {
        navigate(`/posts/${+postId}`)
    }

    // useEffect(() => {
    //     dispatchgetPosts();
    // }, [dispatch]);

    return (
        <div className='Post-Tile-Container'>
            {user ? (
                <CreatePostInput user={user}/>
            ): (
                null
            )}
            {posts && posts.map((post) => (
                <div className='Post-Tile-Inner-Container' onClick={() => visitPost(post.id)}>
                    <h3>{post.title}</h3>
                    <p>{post.postText}</p>

                    <div>
                        <button>{post.Comments.length}{post.Comments.length === 1 ? "Comment" : "Comments"}</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostTile;
