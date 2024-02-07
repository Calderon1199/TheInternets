import { deleteCommunity } from '../../../redux/community';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useModal } from '../../../context/Modal';
import './CommunityModal.css';


function DeleteCommunityModal({community}) {
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDelete = () => {
        dispatch(deleteCommunity(community.id));
        navigate("/profile?deleted=true");
        closeModal();
    }
    return (
        <div className='Delete-Post-Modal'>
            <div className="Delete-Post-Container">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div className='Warning-Text'>
                    <h3>Are you sure?</h3>
                    <p id="warning-text">This action cannot be undone. All values associated with this Community, including posts will be lost.</p>
                </div>
                <div className='Delete-Modal-Buttons'>
                    <button id='delete-button' onClick={handleDelete}>Delete Community</button>
                    <button id='cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCommunityModal;
