import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CommentInputForm from '../../Comments/CommentInputForm';
import { editPost, getSinglePost } from '../../../redux/post';
import { calculateTimeDifference } from '../PostComponent';
import CommentTile from '../../Comments/CommentTile';

import CommunityWidget from '../../Communities/CommunityWidget';
import { getSingleCommunity } from '../../../redux/community';
import DeletePostModal from '../DeletePostModal';

import { getCommentsForPost } from '../../../redux/comment';
import { useModal } from '../../../context/Modal';
import "./PostView.css";
import LikeComponent from '../../Likes/LikeComponent/LikeComponent';
import { getAllUserLikes } from '../../../redux/like';


function PostView() {
    const comments = useSelector(state => state.comments?.postComments);
    const community = useSelector(state => state.communities?.singleCommunity)
    const post = useSelector(state => state.posts?.singlePost);
    const user = useSelector(state => state.session.user);


    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [postText, setPostText] = useState("");
    const [errors, setErrors] = useState({});

    const { setModalContent } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {postId} = useParams();

    useEffect( () => {
            const fetchData = async () => {
            const singlePost = await dispatch(getSinglePost(+postId));
            if (user) dispatch(getAllUserLikes())
            await dispatch(getSingleCommunity(singlePost.categoryId));
            await dispatch(getCommentsForPost(postId));
            setLoading(false);
        };

    fetchData();
    }, [dispatch, user]);

    const handleTextChange = (e) => {
        setPostText(e.target.value);
        const newErrors = { ...errors };

        if (e.target.value.length === 0) {
            newErrors.postText = "";
        } else if (e.target.value.startsWith(' ')) {
            newErrors.postText = 'Description cannot start with spaces.';
        } else if (e.target.value.length <= 5) {
            newErrors.postText = 'Title must be longer than five characters.';
        } else {
            newErrors.postText = '';
        }
        setErrors(newErrors);

        !newErrors.postText ? setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleEditPost = async (postId, title, catId) => {
        const data = {
            postText: postText.trim(),
            title: title.trim(),
            categoryId: catId
        }
        await dispatch(editPost(postId, data))
        .then(() => {
            dispatch(getSinglePost(+postId));
        })
        .then(() => {
            setIsEditing(false);
        })
    }



    return (
        <div>
            <div className='Post-View-Banner'>
                <div className='Like'>
                    {!loading ? (
                        <p>{post.Likes.filter(like => like.isLiked).length - post.Likes.filter(like => !like.isLiked).length}</p>
                    ): (
                        <img src='../Rolling-1s-200px.svg' id='Like-Load'></img>
                    )}
                    <LikeComponent postId={post.id} catId={post.categoryId} isProfile={false}/>
                </div>
                <p id='header-title'>{post.title}</p>
                <i className="fa-solid fa-xmark" id='post-view-exit' onClick={() => navigate(-1)}></i>
            </div>
            <div className='Post-Back-Drop'>
                <div className='Single-Post-Container'>
                    {loading ? (
                        <img src='../Rolling-1s-200px.svg'></img>
                    ) : (
                        <div className='Single-Post-Inner-Container'>
                            <div className='Single-Post-Info-Container' id='post-info-cursor'>
                                <div className='Post-Info-Left'>
                                    <p onClick={() => navigate(`/communities/${post.communityId}`)}>{community?.name}</p>
                                    <span>&#8226;</span>
                                    <p onClick={() => alert('Feature coming soon...')}>Posted by {post.User?.username}</p>
                                </div>
                                <p>{calculateTimeDifference(post.createdAt, post.updatedAt)}</p>
                            </div>
                            <div className='Post-Info-Outer-Container'>
                                <div className='Post-Text-Tile-Container' id='post-text-cursor'>
                                    <h3>{post?.title}</h3>
                                    {post.PostImages?.length > 0 && (
                                        <img src={post.PostImages?.find((img) => img.preview === true)?.url} alt='Post Image'></img>
                                    )}
                                    {isEditing ? (
                                        <div className='Post-Edit-Container'>
                                            <h3>Edit your post</h3>
                                            <label>
                                                <textarea type="text" value={postText} onChange={(e) => handleTextChange(e)}></textarea>
                                            </label>
                                            <div className='Post-Edit-Buttons'>
                                                <button id={buttonDisabled ? 'submit-edit-post-disabled': 'submit-edit-post-enabled'} disabled={buttonDisabled} onClick={() => handleEditPost(post.id, post.title, post.categoryId)}>Edit</button>
                                                <button id='cancel-button2' onClick={() => setIsEditing(false)}>Cancel</button>
                                                {errors && errors.postText && <p id='edit-error' className="errorDiv">{errors.postText}</p>}
                                            </div>
                                        </div>
                                    ): (
                                        <p className='Post-Text'>{post.postText}</p>
                                    )}
                                </div>
                                <div className='Single-Post-Buttons'>
                                    <div className='Option-Button-Container'>
                                        <button className="post-comment-cursor"><i className="fa-regular fa-message"></i>{post?.Comments?.length}{post?.Comments?.length === 1 ? " Comment" : " Comments"}</button>
                                    </div>
                                    {post.userId === user?.id && (
                                        <div className='Option-Button-Container'>
                                            <button onClick={() => setModalContent(<DeletePostModal post={post}/>)}>Remove Post</button>
                                            <button onClick={() => { setIsEditing(true); setPostText(post.postText); if (post.postText.length) setButtonDisabled(false)}}>Edit Post</button>                                </div>
                                    )}
                                </div>
                            </div>
                            <div className='Comment-Container'>
                                <CommentInputForm postId={postId} />
                                {comments.length > 0 ? (
                                    <CommentTile comments={comments}/>
                                ): (
                                    <div className='Empty-Comments'>
                                        <i className="fa-solid fa-comments"></i>
                                        <h3>No comments yet</h3>
                                        <p>Be the first to share what you think!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <CommunityWidget isPostView={true}/>
            </div>
        </div>
    );
}

export default PostView;
