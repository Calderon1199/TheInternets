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
    const [currentImageIndex, setCurrentImageIndex] = useState([]);
    const [editing, setEditing] = useState({});
    const [newPosts, setPosts] = useState();
    const [type, setType] = useState();

    const navigate = useNavigate();
    const { setModalContent } = useModal();
    const dispatch = useDispatch();

    const sortNew = (type) => {
        setType(type);
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
    } else if (type === 'like'){
        const sortedLikes = posts
        .filter(post => post.Likes && post.Likes.length > 0 && post.Likes[0].isLiked === true)
        .sort((a, b) => b.Likes.length - a.Likes.length);
        setPosts(sortedLikes)
    }
}

    useEffect(() => {
        setPosts(posts);
        sortNew(type);
        const initialIndex = {};
        posts.forEach(post => {
            initialIndex[post.id] = 0;
        });
        setCurrentImageIndex(initialIndex);
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

     const handleImageIndexChange = (postId, index) => {
        setCurrentImageIndex((prevIndexes) => ({
            ...prevIndexes,
            [postId]: index,
        }));
    };



    return (
            <div className='Post-Tile-Container'>
                {user && !isProfile && <CreatePostInput user={user} />}
                <div className='Sort-Button-Container'>
                <button onClick={() => sortNew('new')} className={type === 'new' ? "enabled" : "disabled"}>New</button>
                <button onClick={() => sortNew('old')} className={type === 'old' ? "enabled" : "disabled"}>Old</button>
                <button onClick={() => sortNew('like')} className={type === 'like' ? "enabled" : "disabled"}>Most Liked</button>
                <button onClick={() => sortNew('con')} className={type === 'con' ? "enabled" : "disabled"}>Controversial</button>
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
                            {post.PostImages?.length > 0 && (
                            <div className='Img-Container'>
                                <img
                                    className='Post-Img'
                                    onClick={() => navigate(`/posts/${post.id}`)}
                                    src={post?.PostImages[currentImageIndex[post.id]]?.url}
                                    alt='Post Image'
                                ></img>
                                {post.PostImages.length > 1 && (
                                    <>
                                        <div
                                            className={currentImageIndex[post.id] > 0 ? 'Image-Switch-Container' : 'Image-Switch-Container-Hide'}
                                            onClick={() => handleImageIndexChange(post.id, currentImageIndex[post.id] - 1)}
                                        >
                                            {currentImageIndex[post.id] > 0 && (
                                                <div className='Image-Switch-Container1'>
                                                    <i className='fa-solid fa-angle-left'></i>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                currentImageIndex[post.id] < post.PostImages.length - 1
                                                    ? 'Image-Switch-Container-Right'
                                                    : 'Image-Switch-Container-Right-Hide'
                                            }
                                            onClick={() => handleImageIndexChange(post.id, currentImageIndex[post.id] + 1)}
                                        >
                                            {currentImageIndex[post.id] < post.PostImages.length - 1 && (
                                                <div className='Image-Switch-Container2'>
                                                    <i className='fa-solid fa-angle-right'></i>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
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
