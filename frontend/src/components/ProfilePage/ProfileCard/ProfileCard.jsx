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
    return (
        <div className='User-Card'>
            <div className='Handle'>
                {user?.profileImg ? (
                    <div className='User-Image'>
                        <img src={user.profileImg}></img>
                        <i class="fa-solid fa-camera" onClick={() => setModalContent(<ImageEditModal />)}></i>
                    </div>
                ) : (
                    <div className='User-Image'>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
                        <i class="fa-solid fa-camera" id='no-avatar' onClick={() => setModalContent(<ImageEditModal />)}></i>
                    </div>
                )}
                <h3>Hello {user?.username}</h3>
            </div>
            <div className='User-Card-Button'>
                <button id='Post-Widget-Button3' onClick={() => createPost()}>New Post</button>
            </div>
        </div>
    );
}

export default ProfileCard;
