import React from 'react';
import { useNavigate } from "react-router-dom";
import './CreatePostInput.css';

function CreatePostInput({ user }) {
    const navigate = useNavigate();

    const redirectToCreate = () => {
        navigate('/posts/new');
    };

    return (
        <div className='Create-Post-Bar'>
            <div className='Post-Bar-Avatar'>
                <img src={user.profileImg} alt="User Profile"></img>
            </div>
            <div className='Create-Post-Input'>
            <label>
                <input type="text" onClick={redirectToCreate} placeholder='Create Post'/>
            </label>
            </div>
        </div>
    );
}

export default CreatePostInput;
