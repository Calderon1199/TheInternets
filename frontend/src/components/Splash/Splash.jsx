import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {getCommunities, getSingleCommunity, getUserCommunities } from '../../redux/community';
import { getPosts } from '../../redux/post';

import PostTile from "../MainPosts/PostComponent/";
import HomePageWidget from './HomePageWidget';
import "./Splash.css";
import { getAllUserLikes } from '../../redux/like';

const Splash = () => {
  const allPosts = useSelector(state => state.posts?.allPosts);
  const user = useSelector(state => state.session?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunities())
    dispatch(getPosts());
    dispatch(getSingleCommunity(1));
    if (user) {
      dispatch(getUserCommunities())
      dispatch(getAllUserLikes());
    }
  }, [dispatch, user])




  return (
    <div className='Main-Page'>
        <PostTile posts={allPosts} isProfile={false}/>
        <HomePageWidget />
    </div>
  );
}

export default Splash;
