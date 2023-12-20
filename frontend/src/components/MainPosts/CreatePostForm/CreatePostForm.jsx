import React, { useState } from 'react';
import "./CreatePostForm.css";
import { useDispatch } from 'react-redux';
import { createPost } from '../../../redux/post';

function CreatePostForm(props) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const dispatch = useDispatch();

    const handleSubmitPost = () => {
        dispatch(createPost({title, postText, categoryId: 1}))
    }


    return (
        <div className='Post-Form-Container'>
            <h1>Create a post</h1>
            <div className='Post-Input-Container'>
                <label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                </label>
                <label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Text'/>
                </label>
            </div>
            <button onClick={handleSubmitPost}>Post</button>
        </div>
    );
}

export default CreatePostForm;
