import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunities, getSingleCommunity, getUserCommunities } from '../../../redux/community';
import { useParams } from 'react-router-dom';
import './CommunityPage.css';
import CreatePostInput from '../../MainPosts/CreatPost';
import PostTile from '../../MainPosts/PostComponent';
import CommunityWidget from '../CommunityWidget';
import { getPosts } from '../../../redux/post';
import { getAllUserLikes } from '../../../redux/like';

function CommunityPage() {
    const dispatch = useDispatch();
    const {communityId} = useParams();
    const user = useSelector(state => state.session?.user)
    const community = useSelector(state => state.communities?.singleCommunity);


    useEffect(() => {
        dispatch(getCommunities())
    dispatch(getPosts());
    dispatch(getSingleCommunity(communityId));
    if (user) {
      dispatch(getUserCommunities())
      dispatch(getAllUserLikes());
    }
    }, [communityId, user])


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
