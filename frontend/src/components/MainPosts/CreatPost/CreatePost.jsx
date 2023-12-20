import React from 'react';
import { useNavigate } from "react-router-dom";

function CreatePostInput(user) {
    const navigate = useNavigate();

    const redirectToCreate = () => {
        navigate('/posts/new');
    };

    return (
        <div>
            <img src={user.profileImg} alt="User Profile"></img>
            <label>
                <input type="text" onClick={redirectToCreate} placeholder='Create Post'/>
            </label>
        </div>
    );
}

export default CreatePostInput;
