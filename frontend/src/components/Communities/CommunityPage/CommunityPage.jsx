import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCommunity } from '../../../redux/community';
import { useParams } from 'react-router-dom';
import './CommunityPage.css';
import CreatePostInput from '../../MainPosts/CreatPost';
import PostTile from '../../MainPosts/PostComponent';
import CommunityWidget from '../CommunityWidget';

function CommunityPage() {
    const dispatch = useDispatch();
    const {communityId} = useParams();
    const community = useSelector(state => state.communities?.singleCommunity);


    useEffect(() => {
        dispatch(getSingleCommunity(+communityId))
    }, [communityId])


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
                    <PostTile posts={community?.posts}/>
                    ): (
                        <CreatePostInput />
                    )}
                    <CommunityWidget />
            </div>
        </div>
    );
}

export default CommunityPage;
