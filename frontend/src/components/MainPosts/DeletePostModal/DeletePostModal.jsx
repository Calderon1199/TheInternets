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
        navigate("/profile");
        closeModal();
    }
    return (
        <div className='Delete-Post-Modal'>
            <div className="Delete-Post-Container">
                <p>Are you sure you want to delete this post?</p>
                <div className='Delete-Modal-Buttons'>
                    <button id='delete-button' onClick={handleDelete}>Delete</button>
                    <button id='cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeletePostModal;
