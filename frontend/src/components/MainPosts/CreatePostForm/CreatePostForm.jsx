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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getCommunities());
  }, []);

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

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
  };

  const handleChangePostText = (e) => {
    setPostText(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, postText: '' }));
  };

  const handleSubmitPost = async () => {
      const errorCollector = {};

      if (!title) {
        errorCollector.title = 'Please provide a title.';
      }

      if (title.startsWith(' ') || title.endsWith(' ')) {
        errorCollector.title = 'Title cannot start or end with spaces.';
      }

      if (selectedCommunity === null) {
        errorCollector.community = 'Please choose a community.';
      }

      if (postText.startsWith(' ') || postText.endsWith(' ')) {
        errorCollector.postText = 'Story cannot start or end with spaces.';
      }

      setErrors(errorCollector);

    if (Object.keys(errorCollector).length === 0) {
      const post = await dispatch(createPost({ title, postText, categoryId: selectedCommunity?.id }));
      navigate(`/posts/${post.id}`);
    }
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
                onChange={handleChangeTitle}
                value={title}
                placeholder="Title"
                />
            </label>
            {errors && errors.community && <p className="errorDiv">{errors.community}</p>}
            {errors.title && <p className="errorDiv">{errors.title}</p>}
            <label>
              <textarea
                type="text"
                className="Text-Input"
                onChange={handleChangePostText}
                value={postText}
                placeholder="Text (optional)"
              />
            </label>
            {errors.postText && <p className="errorDiv">{errors.postText}</p>}
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
