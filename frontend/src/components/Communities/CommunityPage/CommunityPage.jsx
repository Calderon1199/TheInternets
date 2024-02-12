import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    const [loading, setLoading] = useState(true);

    const {communityId} = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleCommunity(communityId));
            setLoading(false);
            await dispatch(getCommunities())
            await dispatch(getPosts());
            if (user) {
            await dispatch(getUserCommunities())
            awaitdispatch(getAllUserLikes());
            }
        }
        fetchData();
    }, [dispatch, communityId, user]);

    if (loading) {
        if (loading) {
        return (
            <div className='Loading-Profile'>
                <img src='../Rolling-1s-200px.svg'></img>
            </div>
        )
        }
    }


    return (
        <div className='Community-Container'>
            <div className='Community-Banner'>
                <img src={community?.banner}></img>
            </div>
            <div className='Community-Header'>
                <div className='Inner-Community-Header'>
                    <div className='Comm-Image-Container'>
                        {community.avatar ? (
                            <img src={community.avatar}></img>
                        ): (
                            <i class="fa-solid fa-people-roof"></i>
                        )}
                    </div>
                    <div className='Inner-Community-Header-Img'>
                        <h1>{community?.name}</h1>
                        <p>{community?.name}</p>
                    </div>
                </div>
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
