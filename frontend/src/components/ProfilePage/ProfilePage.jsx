import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PostTile from '../MainPosts/PostComponent';
import { getUserPosts } from '../../redux/post';
import { useSelector } from 'react-redux';

function ProfilePage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [hasPost, setHasPost] = useState(false);
    const userPosts = useSelector(state => state.posts?.userPosts);

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
            {userPosts.length > 0 ? (
                <PostTile posts={userPosts} />
            ): (
                !hasPost && (
                    <h2>Create a post</h2>
                )
            )}
        </div>
    );
}

export default ProfilePage;
