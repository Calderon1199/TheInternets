import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

function ProfileCard({user}) {
    const navigate = useNavigate();

    const createPost = () => {
        navigate('/posts/new');
    }
    return (
        <div className='User-Card'>
            <div className='Handle'>
                <h3>Hello {user?.username}</h3>
            </div>
            <div className='User-Card-Button'>
                <button id='Post-Widget-Button3' onClick={() => createPost()}>New Post</button>
            </div>
        </div>
    );
}

export default ProfileCard;
