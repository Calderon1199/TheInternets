import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteComment, editComment, getComments, getUserComments } from '../../redux/comment';
import ProductTile from "../MainPosts/PostComponent/";
import { getPosts } from '../../redux/post';
import "./Splash.css";

const Splash = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.posts?.allPosts);

  useEffect(() => {
    dispatch(getComments());
    dispatch(getPosts());
  }, [dispatch])



  return (
    <div className='Main-Page'>
        <ProductTile posts={allPosts}/>
    </div>
  );
}

export default Splash;
