import { useDispatch, useSelector } from "react-redux";

import { deleteComment } from "../../../redux/comment";
import { useModal } from "../../../context/Modal";

import "./DeleteCommentModal.css";
import { getSinglePost } from "../../../redux/post";

function DeleteCommentModal({ comment }) {
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts?.singlePost);
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteComment(comment.id))
        .then(() => {
            dispatch(getSinglePost(post.id))
        })
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
                    <button id='delete-button' onClick={handleDelete}>Delete Comment</button>
                    <button id='cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>

    );
}

export default DeleteCommentModal;
