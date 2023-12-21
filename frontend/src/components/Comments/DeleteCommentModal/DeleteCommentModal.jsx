import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteComment } from "../../../redux/comment";
import "./DeleteCommentModal.css";

function DeleteCommentModal({ comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteComment(comment.id));
        closeModal();
    }



    return (
        <>
            <div className="Delete-Post-Container">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </>
    );
}

export default DeleteCommentModal;
