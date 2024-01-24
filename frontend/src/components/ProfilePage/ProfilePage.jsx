import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import PostTile from '../MainPosts/PostComponent';

import { getUserPosts } from '../../redux/post';

function ProfilePage() {
    const userPosts = useSelector(state => state.posts?.userPosts);

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
        <div className='Main-Page'>
            {userPosts.length > 0 ? (
                <PostTile posts={userPosts} isProfile={true}/>
            ): (
                !hasPost && (
                    <h2>Create a post</h2>
                )
            )}
        </div>
    );
}

export default ProfilePage;
