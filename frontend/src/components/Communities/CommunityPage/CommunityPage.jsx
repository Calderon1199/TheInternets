import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import CreatePostInput from '../../MainPosts/CreatPost';
import PostTile from '../../MainPosts/PostComponent';
import CommunityWidget from '../CommunityWidget';

import { getCommunities, getSingleCommunity, getUserCommunities } from '../../../redux/community';
import { getAllUserLikes } from '../../../redux/like';
import { getPosts } from '../../../redux/post';
import './CommunityPage.css';

function CommunityPage() {
    const community = useSelector(state => state.communities?.singleCommunity);
    const user = useSelector(state => state.session?.user);

    const {communityId} = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCommunities())
    dispatch(getPosts());
    dispatch(getSingleCommunity(communityId));
    if (user) {
      dispatch(getUserCommunities())
      dispatch(getAllUserLikes());
    }
    }, [dispatch, communityId, user])


    return (
        <div className='Community-Container'>
            <div className='Community-Banner'>
            </div>
            <div className='Community-Header'>
                <h1>{community?.name}</h1>
                <p>{community?.name}</p>
            </div>
            <div className='Community-Page'>
                {community?.posts?.length ? (
                    <PostTile posts={community?.posts} catId={communityId}/>
                    ): (
                        <CreatePostInput />
                    )}
                    <CommunityWidget />
            </div>
        </div>
    );
}

export default CommunityPage;
