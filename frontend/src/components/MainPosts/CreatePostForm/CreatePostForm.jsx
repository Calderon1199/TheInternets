import React, { useEffect, useState, useRef } from 'react';
import './CreatePostForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../redux/post';
import { useNavigate } from 'react-router-dom';
import PostRules from '../PostRules';
import { getCommunities } from '../../../redux/community';

function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const communities = useSelector(state => state.communities?.allCommunities);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getCommunities());
  }, [])

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
    setShowDropdown(false);
  };

  const handleSubmitPost = async () => {
    const post = await dispatch(createPost({ title, postText, categoryId: selectedCommunity?.id || 1 }));
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="Create-Post-Backdrop">
      <div className="Create-Post-Container">
        <div className="Post-Form-Container">
          <div className="Create-Post-Header">
            <h3>Create a post</h3>
          </div>
          <div className="Community-Dropdown" ref={dropdownRef}>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              {selectedCommunity ? selectedCommunity.name : 'Select Community'}
            </button>
            {showDropdown && (
              <div className="Community-Dropdown-Options">
                {communities.map((community) => (
                    <div className='Community-Name-Container'>
                        <div key={community.id} className='Community-Name' onClick={() => handleCommunityClick(community)}>
                            {community.name}
                        </div>
                    </div>
                ))}
              </div>
            )}
          </div>
          <div className="Post-Input-Container">
            <label>
              <input
                type="text"
                className="Title-Input"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </label>
            <label>
              <textarea
                type="text"
                className="Text-Input"
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Text (optional)"
              />
            </label>
            <div className="Post-Submit-Button">
              <button onClick={handleSubmitPost}>Post</button>
            </div>
          </div>
        </div>
        <PostRules />
      </div>
    </div>
  );
}

export default CreatePostForm;
