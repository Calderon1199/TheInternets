import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CreatePostInput from '../../MainPosts/CreatPost';
import PostTile from '../../MainPosts/PostComponent';
import CommunityWidget from '../CommunityWidget';

import { getCommunities, getSingleCommunity, getUserCommunities } from '../../../redux/community';
import { getAllUserLikes } from '../../../redux/like';
import { getPosts } from '../../../redux/post';
import './CommunityPage.css';
import CommunityImageModal from '../CommunityImageModal/CommunityImageModal';
import { useModal } from '../../../context/Modal';
import LoginFormModal from '../../LoginFormModal';

function CommunityPage() {
    const community = useSelector(state => state.communities?.singleCommunity);
    const user = useSelector(state => state.session?.user);
    const [loading, setLoading] = useState(true);

    const {communityId} = useParams();
    const {setModalContent} = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleCommunity(+communityId));
            setLoading(false);
            await dispatch(getCommunities())
            await dispatch(getPosts());
            if (user) {
            await dispatch(getUserCommunities())
            await dispatch(getAllUserLikes());
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
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
                        )}
                        {community.userId === user?.id && (
                            <i className="fa-solid fa-camera" id="comm-camera" onClick={() => setModalContent(<CommunityImageModal community={community} />)}></i>
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
                        <div className='No-Post-Input'>
                            <CreatePostInput />
                            <div className='No-Posts-Warning'>
                                <h3>There are no posts in this community</h3>
                                <h4>Be the first to share your thoughts!</h4>
                                <button onClick={() => user ? navigate('/posts/new', { state: { community } }) : setModalContent(<LoginFormModal />)}  id='Post-Widget-Button'>Create Post</button>
                            </div>
                        </div>
                    )}
                    <CommunityWidget />
            </div>
        </div>
    );
}

export default CommunityPage;
