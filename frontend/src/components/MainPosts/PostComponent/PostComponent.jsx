import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useModal } from '../../../context/Modal';
import DeletePostModal from '../DeletePostModal';
import { editPost } from '../../../redux/post';

import LikeComponent from '../../Likes/LikeComponent/LikeComponent';
import { calculateTimeDifference } from '.';
import CreatePostInput from '../CreatPost';
import './PostComponent.css';

function PostTile({ posts, isProfile }) {
    const user = useSelector((state) => state.session?.user);

    const [loading, setLoading] = useState(true);
    const [postText, setPostText] = useState({});
    const [editing, setEditing] = useState({});
    const [newPosts, setPosts] = useState();

    const navigate = useNavigate();
    const { setModalContent } = useModal();
    const dispatch = useDispatch();

    useEffect(() => {
        setPosts(posts);
        setLoading(false);
    }, [posts]);


    const editUserPost = (postId, catId, title) => {
        const updatedPostData = {
            categoryId: catId,
            title: title.trim(),
            postText: postText[postId].trim() || '',
        };

        dispatch(editPost(postId, updatedPostData));
        setEditing((prevEditing) => ({ ...prevEditing, [postId]: false }));

        navigate(`/posts/${postId}`);
    };

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
                            <div className='Post-Info-Left'>
                                <h5 onClick={() => navigate(`/communities/${post?.Group?.id}`)} id='group-name'>{post.Group?.name}</h5>
                                <span>&#x2022;</span>
                                <p onClick={() => alert("feature coming soon...")} id='post-owner-name'>Posted by {post.User?.username}</p>
                            </div>
                            <p>{calculateTimeDifference(post.createdAt, post.updatedAt)}</p>
                        </div>
                    <div className='Post-Text-Tile-Container'>
                        <>
                            <h3 onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</h3>
                            {post.PostImages?.length > 0 && !editing[post.id] &&(
                            <div>
                                <img
                                className='Post-Img'
                                onClick={() => navigate(`/posts/${post.id}`)}
                                src={post.PostImages.find((img) => img.preview === true).url}
                                alt='Post Image'
                                ></img>
                            </div>
                            )}
                            {editing[post.id] ? (
                            <div className='Edit-Card-Container'>
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
                                <div className='Edit-Card-Buttons'>
                                    <div className='Edit-Buttons'>
                                        <button className='cancel-button' onClick={() => setEditing((prevEditing) => ({ ...prevEditing, [post.id]: false }))}>
                                        Cancel
                                        </button>
                                        <button className={!editing ? 'disabled': 'enabled'} onClick={() => editUserPost(post.id, post.categoryId, post.title)}>
                                        Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ) : (
                                <p
                                className='Post-Text2'
                                onClick={() => navigate(`/posts/${post.id}`)}
                                >
                                {post.postText}
                            </p>
                            )}
                        </>
                    </div>
                    <div className={editing[post.id] ? 'Post-Buttons-Editing' : 'Post-Buttons'}>
                        <div className='Option-Button-Container'>
                        <button onClick={() => navigate(`/posts/${post.id}`)}>
                            <i className='fa-regular fa-message'></i>
                            {post.Comments?.length}
                            {post.Comments?.length === 1 ? ' Comment' : ' Comments'}
                        </button>
                        <div className='Like-Container'>
                            <div className='Like'>
                                <p>{post.Likes?.filter(like => like.isLiked).length - post.Likes?.filter(like => !like.isLiked).length}</p>
                                <LikeComponent postId={post.id} catId={post.categoryId} isProfile={isProfile}/>
                            </div>
                        </div>
                        </div>
                        {post.userId === user?.id && (
                        <div className='Option-Button-Container'>
                            <button onClick={() => setModalContent(<DeletePostModal post={post}/>)}>
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
