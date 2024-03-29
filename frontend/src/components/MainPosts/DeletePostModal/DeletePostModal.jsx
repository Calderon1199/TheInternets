import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
;
import { useModal } from '../../../context/Modal';
import { deletePost } from '../../../redux/post';

import './DeletePostModal.css';


function DeletePostModal({post}) {
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const res = await dispatch(deletePost(post.id));
        res.message ? navigate("/profile?deleted=true") : navigate("/profile?deleted=false")
        closeModal();
    }
    return (
        <div className='Delete-Post-Modal'>
            <div className="Delete-Post-Container">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div className='Warning-Text'>
                    <h3>Are you sure?</h3>
                    <p id="warning-text">This action cannot be undone. All values associated with this post will be lost.</p>
                </div>
                <div className='Delete-Modal-Buttons'>
                    <button id='delete-button' onClick={handleDelete}>Delete Post</button>
                    <button id='cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeletePostModal;
