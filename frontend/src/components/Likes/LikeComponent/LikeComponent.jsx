import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteUserLike, editUserLike, getAllUserLikes } from "../../../redux/like";
import { useEffect, useState } from "react";
import { getPosts, getUserPosts } from "../../../redux/post";
import LoginFormModal from "../../LoginFormModal";
import { useModal } from "../../../context/Modal";

function LikeComponent({ postId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const currentPath = window.location.pathname;
  const user = useSelector((state) => state.session?.user);
  const userLikes = useSelector(state => state.likes?.allUserLikes);
  const currentLikeStatus = Object.values(userLikes).find(like => like.postId === postId);
  const [like, setLike] = useState(null);

  useEffect(() => {
    if (currentLikeStatus) setLike(currentLikeStatus);

    }, [dispatch, userLikes])


const handleCreateLike = async (boolean) => {
    if (user) {
        await dispatch(createLike({ isLiked: boolean, postId }));
        await dispatch(getAllUserLikes());
        await dispatch(getPosts())
        if (currentPath === '/profile') {
            await dispatch(getUserPosts());
        }

    } else {
        return setModalContent(<LoginFormModal/>)
    }
  }

  const handleEdit = async (type) => {
    if (user) {
        if (type === 'dislike' && like.isLiked) await dispatch(editUserLike(like.id, {isLiked: false}));
        else if (type === 'dislike' && !like.isLiked) await dispatch(deleteUserLike(like.id)), setLike(null);
        else if (type === 'like' && !like.isLiked) await dispatch(editUserLike(like.id, {isLiked: true}));
        else if (type === 'like' && like.isLiked) await dispatch(deleteUserLike(like.id)), setLike(null);
        await dispatch(getAllUserLikes());
        await dispatch(getPosts());
        if (currentPath === '/profile') {
          await dispatch(getUserPosts());
        }
    } else {
        return setModalContent(<LoginFormModal/>)
    }
  }

  return (
    <div>
        {like && user ? (
        <div className='Like-Options'>
            <div>
                <i onClick={() => handleEdit('like')} className={like?.isLiked ? 'fa-solid fa-chevron-up enabled' : 'fa-solid fa-chevron-up disabled'}></i>
                <i onClick={() => handleEdit('dislike')} className={like?.isLiked ? 'fa-solid fa-chevron-down disabled' : 'fa-solid fa-chevron-down enabled'}></i>
            </div>
        </div>
        ): (
        <div className='Like-Options'>
            <div>
                <i onClick={() => handleCreateLike(true)} className='fa-solid fa-chevron-up disabled'></i>
                <i onClick={() => handleCreateLike(false)} className='fa-solid fa-chevron-down disabled'></i>
            </div>
        </div>
        )}
    </div>
  )
}

export default LikeComponent;
