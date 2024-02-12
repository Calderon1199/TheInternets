import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CommentTile from '../Comments/CommentTile/CommentTile';
import PostTile from '../MainPosts/PostComponent';
import ProfileCard from './ProfileCard';

import { getAllUserLikes, getUserDislikes, getUserLikes } from '../../redux/like';
import { getUserComments } from '../../redux/comment';
import { getUserPosts } from '../../redux/post';
import './ProfilePage.css';

function ProfilePage() {
    const userComments = useSelector(state => state.comments?.allUserComments);
    const userDislikes = useSelector(state => state.likes?.userDislikes);
    const userLikes = useSelector(state => state.likes?.userLikes);
    const userPosts = useSelector(state => state.posts?.userPosts);
    const user = useSelector(state => state.session.user);

    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("post");

    const location = useLocation();
    const isDeleted = new URLSearchParams(location.search).get('deleted');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserPosts());
            await dispatch(getUserLikes());
            await dispatch(getUserDislikes());
            setLoading(false)
            await dispatch(getUserComments());
            await dispatch(getAllUserLikes());
        }
        fetchData();
    }, [dispatch])

    if (loading) {
        return (
            <div className='Loading-Profile'>
                <img src='./Rolling-1s-200px.svg'></img>
            </div>
        )
    }


    return (
        <div className='Profile-Page'>
            <div className='Profile-Type-Buttons'>
                <button onClick={() => setType("post")} className={type === 'post' ? 'enabled' : 'disabled'}>Posts</button>
                <button onClick={() => setType("comments")} className={type === 'comments' ? 'enabled' : 'disabled'}>Comments</button>
                <button onClick={() => setType("upvotes")} className={type === 'upvotes' ? 'enabled' : 'disabled'}>Upvotes</button>
                <button onClick={() => setType("downvotes")} className={type === 'downvotes' ? 'enabled' : 'disabled'}>Downvotes</button>
            </div>
            {isDeleted && (
                <div className={isDeleted === 'true' ? "Deleted-Header" : 'Deleted-Header-Bad'}>
                {isDeleted === 'true' ? (
                    <h2>Successfully deleted!</h2>
                ): (
                    <h2>Uh oh... something went wrong</h2>
                )}
                </div>
            )}
            <div className='Main-Page'>
                {!loading && (
                    <>
                    {type === 'post' && (
                        userPosts?.length > 0 ? (
                            <PostTile posts={userPosts} isProfile={true} />
                        ) : (
                            <div className='Empty-User-Data'>
                                <h2>No posts to display yet!</h2>
                            </div>
                        )
                    )}
                    {type === 'comments' && (
                        userComments?.length > 0 ? (
                            <CommentTile comments={userComments} isProfile={true}/>
                        ) : (
                            <div className='Empty-User-Data'>
                                <h2>No comments yet!</h2>
                            </div>
                        )
                    )}
                    {type === 'upvotes' && (
                        userLikes?.length > 0 ? (
                            <PostTile posts={userLikes} isProfile={true} />
                        ) : (
                            <div className='Empty-User-Data'>
                                <h2>No upvotes yet!</h2>
                            </div>
                        )
                    )}
                    {type === 'downvotes' && (
                        userDislikes?.length > 0 ? (
                            <PostTile posts={userDislikes} isProfile={true} />
                        ) : (
                            <div className='Empty-User-Data'>
                                <h2>No downvotes yet!</h2>
                            </div>
                        )
                    )}
                    </>
                )}
                <ProfileCard user={user}/>
            </div>
        </div>
    );
}

export default ProfilePage;
