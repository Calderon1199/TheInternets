import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import PostTile from '../MainPosts/PostComponent';

import { getUserPosts } from '../../redux/post';
import ProfileCard from './ProfileCard';
import './ProfilePage.css';
import { useLocation } from 'react-router-dom';

function ProfilePage() {
    const user = useSelector(state => state.session.user);
    const userPosts = useSelector(state => state.posts?.userPosts);
    const location = useLocation();
    const isDeleted = new URLSearchParams(location.search).get('deleted');

    const [loading, setLoading] = useState(true);
    const [hasPost, setHasPost] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPosts());
        if (userPosts.length) {
            setHasPost(true)
        }
        setLoading(false)
    }, [dispatch])

    if(loading) (
        <h3>..loading</h3>
    )

    return (
        <div>
            {isDeleted && (
                <div className='Deleted-Header'>
                    <h2>Successfully deleted!</h2>
                </div>
            )}
            <div className='Main-Page'>
                {userPosts.length > 0 ? (
                    <PostTile posts={userPosts} isProfile={true}/>
                ): (
                    !hasPost && (
                        <h2>Create a post</h2>
                    )
                )}
                <ProfileCard user={user}/>
            </div>
        </div>
    );
}

export default ProfilePage;
