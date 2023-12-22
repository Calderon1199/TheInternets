import React, { useState } from 'react';
import "./CreatePostForm.css";
import { useDispatch } from 'react-redux';
import { createPost } from '../../../redux/post';
import { useNavigate } from 'react-router-dom';

function CreatePostForm() {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const [postText, setPostText] = useState("");
    const dispatch = useDispatch();

    const handleSubmitPost = async () => {
        const post = await dispatch(createPost({title, postText, categoryId: 1}))
        navigate(`/posts/${post.id}`);
    }


    return (
        <div className='Create-Post-Backdrop'>
            <div className='Post-Form-Container'>
                <div className='Create-Post-Header'>
                    <h3>Create a post</h3>
                </div>
                <div className='Post-Input-Container'>
                    <label>
                        <input type="text" className='Title-Input' onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                    </label>
                    <label>
                        <textarea type="text" className='Text-Input' onChange={(e) => setPostText(e.target.value)} placeholder='Text (optional)'/>
                    </label>
                    <div className='Post-Submit-Button'>
                        <button onClick={handleSubmitPost}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostForm;
