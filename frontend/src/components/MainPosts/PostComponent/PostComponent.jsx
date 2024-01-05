import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { deletePost, editPost } from '../../../redux/post';
import CreatePostInput from '../CreatPost';

import { calculateTimeDifference } from '.';
import './PostComponent.css';

function PostTile({ posts, isProfile }) {
    const user = useSelector((state) => state.session?.user);

    const [loading, setLoading] = useState(true);
    const [postText, setPostText] = useState({});
    const [editing, setEditing] = useState({});
    const [newPosts, setPosts] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setPosts(posts);
        setLoading(false);
    }, [posts]);


    const editUserPost = (postId, catId, title) => {
        const updatedPostData = {
            categoryId: catId,
            title,
            postText: postText[postId] || '',
        };

        dispatch(editPost(postId, updatedPostData));
        setEditing((prevEditing) => ({ ...prevEditing, [postId]: false }));

        navigate(`/posts/${postId}`);
    };

    const deleteUserPost = (postId) => {
        dispatch(deletePost(+postId));
    }

    const sortNew = (type) => {
        if (type === 'new') {
            setPosts(posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else if (type === 'old') {
            setPosts(posts.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        } else if (type === 'con'){
            const sortedPosts = posts.slice().sort((a, b) => {
          const commentsComparison = b.Comments?.length - a.Comments?.length;
          return commentsComparison !== 0 ? commentsComparison : a.id % 2 === 0 ? 1 : -1;
        })
        setPosts(sortedPosts)
        }
    }

    return (
        <div className='Post-Tile-Container'>
            {user && !isProfile && <CreatePostInput user={user} />}
            <div className='Sort-Button-Container'>
            <button onClick={() => sortNew('new')}>New</button>
            <button onClick={() => sortNew('old')}>Old</button>
            <button onClick={() => sortNew('con')}>Controversial</button>
            </div>
            {!loading &&
            newPosts?.map((post) => (
                <div className='Post-Tile-Inner-Container' key={post.id}>
                <div className='Post-Info-Container'>
                    <h5 id='group-name'>{post.Group?.name}</h5>
                    <span>&#x2022;</span>
                    <p id='post-owner-name'><span>Posted by </span>{post.User?.username}</p>
                    <p>{calculateTimeDifference(post.createdAt)}</p>
                </div>
                <div className='Post-Text-Tile-Container'>
                    {post.PostImages?.length > 0 ? (
                    <div>
                        <h3 onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</h3>
                        <img
                        className='Post-Img'
                        onClick={() => navigate(`/posts/${post.id}`)}
                        src={post.PostImages.find((img) => img.preview === true).url}
                        alt='Post Image'
                        ></img>
                    </div>
                    ) : (
                    <>
                        <h3 onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</h3>
                        {editing[post.id] ? (
                        <div>
                            <label>
                            <textarea
                                className='Edit-Input'
                                type='text'
                                onChange={(e) =>
                                setPostText((prevPostText) => ({
                                    ...prevPostText,
                                    [post.id]: e.target.value,
                                }))
                                }
                                defaultValue={post.postText}
                            ></textarea>
                            </label>
                            <button onClick={() => editUserPost(post.id, post.categoryId, post.title)}>
                            Post
                            </button>
                            <button onClick={() => setEditing((prevEditing) => ({ ...prevEditing, [post.id]: false }))}>
                            Cancel
                            </button>
                        </div>
                        ) : (
                        <p
                            className='Post-Text'
                            onClick={() => navigate(`/posts/${post.id}`)}
                        >
                            {post.postText}
                        </p>
                        )}
                    </>
                    )}
                </div>
                <div className='Post-Buttons'>
                    <div className='Option-Button-Container'>
                    <button onClick={() => navigate(`/posts/${post.id}`)}>
                        <i className='fa-regular fa-message'></i>
                        {post.Comments?.length}
                        {post.Comments?.length === 1 ? ' Comment' : ' Comments'}
                    </button>
                    </div>
                    {post.userId === user?.id && (
                    <div className='Option-Button-Container'>
                        <button onClick={() => deleteUserPost(post.id)}>
                        Remove Post
                        </button>
                        {isProfile && (
                        <button onClick={() => setEditing((prevEditing) => ({ ...prevEditing, [post.id]: true }))}>
                        Edit Post
                        </button>
                        )}
                    </div>
                    )}
                </div>
                </div>
            ))}
        </div>
    );
}

export default PostTile;
