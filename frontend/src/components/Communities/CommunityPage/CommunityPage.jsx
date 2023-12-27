import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCommunity } from '../../../redux/community';
import { useParams } from 'react-router-dom';

function CommunityPage(props) {
    const dispatch = useDispatch();
    const {communityId} = useParams();
    const community = useSelector(state => state.communities.singleCommunity);


    useEffect(() => {
        dispatch(getSingleCommunity(+communityId))
    }, [communityId])


    return (
        <div>
            

        </div>
    );
}

export default CommunityPage;
