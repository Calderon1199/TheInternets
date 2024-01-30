import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteUserLike, editUserLike, getAllUserLikes } from "../../../redux/like";
import { useEffect, useState } from "react";
import { getPosts, getUserPosts } from "../../../redux/post";

function LikeComponent({ postId }) {
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  const user = useSelector((state) => state.session?.user);
  const userLikes = useSelector(state => state.likes?.allUserLikes);
  const currentLikeStatus = Object.values(userLikes).find(like => like.postId === postId);
  const [like, setLike] = useState(null);

  useEffect(() => {
    if (currentLikeStatus) setLike(currentLikeStatus);

    }, [dispatch, userLikes])


const handleCreateLike = async (boolean) => {
    console.log(postId)
    await dispatch(createLike({ isLiked: boolean, postId }));
    await dispatch(getAllUserLikes());
    await dispatch(getPosts())
    if (currentPath === '/profile') {
      await dispatch(getUserPosts());
    }
  }

  const handleEdit = async (type) => {
    console.log(like)
    if (type === 'dislike' && like.isLiked) await dispatch(editUserLike(like.id, {isLiked: false}));
    else if (type === 'dislike' && !like.isLiked) await dispatch(deleteUserLike(like.id)), setLike(null);
    else if (type === 'like' && !like.isLiked) await dispatch(editUserLike(like.id, {isLiked: true}));
    else if (type === 'like' && like.isLiked) await dispatch(deleteUserLike(like.id)), setLike(null);
    await dispatch(getAllUserLikes());
    await dispatch(getPosts());
    if (currentPath === '/profile') {
      await dispatch(getUserPosts());
    }
  }



//   const handleLike = async (like, type) => {
//     if (user.id === like?.userId) {
//       if (like.isLiked && type === 'like') {
//         console.log('3')
//         // await delete like
//         await dispatch(deleteUserLike(like.id));
//       } else if (!like.isLiked && type === 'dislike') {
//         console.log('6')
//         // await delete like
//         await dispatch(deleteUserLike(like.id));
//       }
//     }
//     dispatch(getPosts())
//   };

  return (
    <div>
        {like ? (
        <div className='Like-Options'>
            <div>
                <i onClick={() => handleEdit('like')} className={like?.isLiked ? 'fa-regular fa-circle-up enabled' : 'fa-regular fa-circle-up disabled'}></i>
                <i onClick={() => handleEdit('dislike')} className={like?.isLiked ? 'fa-regular fa-circle-down disabled' : 'fa-regular fa-circle-down enabled'}></i>
            </div>
        </div>
        ): (
        <div className='Like-Options'>
            <div>
                <i onClick={() => handleCreateLike(true)} className='fa-regular fa-circle-up disabled'></i>
                <i onClick={() => handleCreateLike(false)} className='fa-regular fa-circle-down disabled'></i>
            </div>
        </div>
        )}
    </div>
  )
}

export default LikeComponent;
