import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {getCommunities, getSingleCommunity, getUserCommunities } from '../../redux/community';
import { getPosts } from '../../redux/post';

import ProductTile from "../MainPosts/PostComponent/";
import HomePageWidget from './HomePageWidget';
import "./Splash.css";

const Splash = () => {
  const allPosts = useSelector(state => state.posts?.allPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunities())
    dispatch(getUserCommunities())
    dispatch(getPosts());
    dispatch(getSingleCommunity(1));
  }, [dispatch])




  return (
    <div className='Main-Page'>
        <ProductTile posts={allPosts} isProfile={false}/>
        <HomePageWidget />
    </div>
  );
}

export default Splash;
