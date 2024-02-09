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
        dispatch(getUserPosts());
        dispatch(getUserLikes());
        dispatch(getUserDislikes());
        dispatch(getUserComments());
        dispatch(getAllUserLikes());
        setLoading(false)
    }, [dispatch])

    if(loading) (
        <h3>..loading</h3>
    )

    return (
        <div className='Profile-Pagr'>
            {isDeleted && (
                <div className='Deleted-Header'>
                    <h2>Successfully deleted!</h2>
                </div>
            )}
            <div className='Profile-Type-Buttons'>
                <button onClick={() => setType("post")} className={type === 'post' ? 'enabled' : 'disabled'}>Posts</button>
                <button onClick={() => setType("comments")} className={type === 'comments' ? 'enabled' : 'disabled'}>Comments</button>
                <button onClick={() => setType("upvotes")} className={type === 'upvotes' ? 'enabled' : 'disabled'}>Upvotes</button>
                <button onClick={() => setType("downvotes")} className={type === 'downvotes' ? 'enabled' : 'disabled'}>Downvotes</button>
            </div>
            <div className='Main-Page'>
                {type === 'post' && (
                    userPosts?.length > 0 ? (
                        <PostTile posts={userPosts} isProfile={true} />
                    ) : (
                        <h2>No posts to display yet!</h2>
                    )
                )}
                {type === 'comments' && (
                    userComments?.length > 0 ? (
                        <CommentTile comments={userComments} />
                    ) : (
                        <h2>No comments yet!</h2>
                    )
                )}
                {type === 'upvotes' && (
                    userLikes?.length > 0 ? (
                        <PostTile posts={userLikes} isProfile={true} />
                    ) : (
                        <h2>No upvotes yet!</h2>
                    )
                )}
                {type === 'downvotes' && (
                    userDislikes?.length > 0 ? (
                        <PostTile posts={userDislikes} isProfile={true} />
                    ) : (
                        <h2>No downvotes yet!</h2>
                    )
                )}
                <ProfileCard user={user}/>
            </div>
        </div>
    );
}

export default ProfilePage;
