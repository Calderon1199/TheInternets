import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';
import { useModal } from '../../../context/Modal';
import ImageEditModal from '../../ImageEdit';

function ProfileCard({user}) {
    const navigate = useNavigate();
    const {setModalContent} = useModal();

    const createPost = () => {
        navigate('/posts/new');
    }

    const timestamp = new Date(user.createdAt); // Replace this with your timestamp

    const formattedDate = timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className='User-Card'>
            <div className='Handle'>
                {user?.profileImg ? (
                    <div className='User-Image'>
                        <img src={user.profileImg}></img>
                        <i className="fa-solid fa-camera" onClick={() => setModalContent(<ImageEditModal />)}></i>
                    </div>
                ) : (
                    <div className='User-Image'>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
                        <i className="fa-solid fa-camera" id='no-avatar' onClick={() => setModalContent(<ImageEditModal />)}></i>
                    </div>
                )}
                <h3>Hello {user?.username}</h3>
                <p><i className="fa-solid fa-cake-candles"></i> {formattedDate}</p>
            </div>
            <div className='User-Card-Button'>
                <button id='Post-Widget-Button3' onClick={() => createPost()}>New Post</button>
            </div>
        </div>
    );
}

export default ProfileCard;
