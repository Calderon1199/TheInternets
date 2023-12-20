import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/post';
import './PostComponent.css';
import CreatePostInput from '../CreatPost';

function PostTile({posts}) {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.allPosts);
    const user = useSelector(state => state.session.user)
    console.log(allPosts, 'ALL POSTS/POST TILE COMPONENT');

    useEffect(() => {
        getPosts();
    }, [dispatch]);

    return (
        <div className='Post-Tile-Container'>
            {user ? (
                <CreatePostInput user={user}/>
            ): (
                null
            )}
            {posts && posts.map((post) => (
                <div className='Post-Tile-Inner-Container'>
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
