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
        <div className='Post-Form-Container'>
            <h1>Create a post</h1>
            <div className='Post-Input-Container'>
                <label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                </label>
                <label>
                    <input type="text" onChange={(e) => setPostText(e.target.value)} placeholder='Text'/>
                </label>
            </div>
            <button onClick={handleSubmitPost}>Post</button>
        </div>
    );
}

export default CreatePostForm;
