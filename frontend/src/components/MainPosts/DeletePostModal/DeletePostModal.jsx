import './DeletePostModal.css';
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../redux/post';
import { useNavigate } from 'react-router-dom';


function DeletePostModal({post}) {
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDelete = () => {
        dispatch(deletePost(post.id));
        navigate("/profile?deleted=true");
        closeModal();
    }
    return (
        <div className='Delete-Post-Modal'>
            <div className="Delete-Post-Container">
                <i class="fa-solid fa-triangle-exclamation"></i>
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
