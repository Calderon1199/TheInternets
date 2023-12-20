import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PostTile from '../MainPosts/PostComponent';
import { getUserPosts } from '../../redux/post';
import { useSelector } from 'react-redux';

function ProfilePage() {
    const dispatch = useDispatch();
    const userPosts = useSelector(state => state.posts?.userPosts);
    console.log(userPosts, 'userposts')

    useEffect(() => {
        dispatch(getUserPosts());
    }, [dispatch])


    return (
        <div>
            {userPosts.length > 0 && (
                <PostTile posts={userPosts} />
            )}
        </div>
    );
}

export default ProfilePage;
