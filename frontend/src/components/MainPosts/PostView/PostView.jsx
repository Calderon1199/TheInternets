import React, { useEffect, useState } from 'react';
import "./PostView.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, editPost, getSinglePost } from '../../../redux/post';


function PostView() {
    const {postId} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.session?.user)
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [postText, setPostText] = useState("");
    const post = useSelector(state => state.posts?.singlePost)

    useEffect(() => {
        dispatch(getSinglePost(+postId));
        setLoading(false)
    }, [dispatch])

    const editUserPost = () => {
        const updatedPostData = {
            categoryId: 1,
            postText,
        }
        dispatch(editPost(postId, updatedPostData));
        dispatch(getSinglePost(+postId))
        setEditing(false);
    }

    const deleteUserPost = (postId) => {
        dispatch(deletePost(+postId));
        navigate("/profile");
    }

    if (loading) (
        <h1>..loading</h1>
    )


    return (
        <div className='Post-Tile-Container'>
            <div className='Post-Tile-Inner-Container'>
                    <div>
                        <h3 onClick={() => visitPost(post.id)}>{post.title}</h3>

                        {editing ? (
                            <div>
                                <label>
                                    <input type="text" onChange={(e) => setPostText(e.target.value)} defaultValue={post.postText}/>
                                </label>
                                <button onClick={() => editUserPost()}>Post</button>
                            </div>
                        ): (
                            <p>{post.postText}</p>
                        )}
                    </div>
                    {post.userId === user.id && (
                        <div>
                            <button onClick={() => deleteUserPost(post.id)}>Remove Post</button>
                            <button onClick={() => setEditing(true)}>Edit Post</button>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default PostView;
