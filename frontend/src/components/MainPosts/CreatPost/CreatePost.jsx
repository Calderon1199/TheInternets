import { useNavigate } from "react-router-dom";

import './CreatePostInput.css';

function CreatePostInput() {
    const navigate = useNavigate();

    return (
        <div className='Create-Post-Bar'>
            <div className='Post-Bar-Avatar'>
                <i className="fa-regular fa-user" id="user-icon" onClick={() => navigate('/profile')}></i>
            </div>
            <div className='Create-Post-Input'>
            <label>
                <input type="text" onClick={() => navigate('/posts/new')} placeholder='Create Post'/>
            </label>
            </div>
        </div>
    );
}

export default CreatePostInput;
