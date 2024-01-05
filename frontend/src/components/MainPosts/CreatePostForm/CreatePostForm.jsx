import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCommunities } from '../../../redux/community';
import { createPost } from '../../../redux/post';
import PostRules from '../PostRules';

import './CreatePostForm.css';

function CreatePostForm() {
    const communities = useSelector(state => state.communities?.allCommunities);

    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [images, setImages] = useState(['', '', '']);
    const [infoType, setInfoType] = useState(true);
    const [postText, setPostText] = useState('');
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

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
    title.length > 5 && selectedCommunity ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
    title.length > 5 && selectedCommunity ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleImageInputChange = (index, imageUrl) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = imageUrl;
      return updatedImages;
    });
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

    const postData = {
      title,
      postText,
      categoryId: selectedCommunity?.id,
      images: images.filter(Boolean),
    };

    try {
      const post = await dispatch(createPost(postData));
      navigate(`/posts/${post.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
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
                    <div className='Community-Name-Container' key={community.id}>
                        <div className='Community-Name' onClick={() => handleCommunityClick(community)}>
                            {community.name}
                        </div>
                    </div>
                ))}
              </div>
            )}
          </div>
          <div className='Post-Type-Buttons'>
            <button onClick={() => setInfoType(true)}><i className="fa-solid fa-font"></i></button>
            <button onClick={() => setInfoType(false)}><i className="fa-solid fa-image"></i></button>
          </div>
         <div className="Post-Input-Container">
            {infoType ? (
                <>
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
                </>
            ): (
                <>
                {images.map((imageUrl, index) => (
                  <label key={index}>
                    <input
                      type="text"
                      className="Title-Input"
                      onChange={(e) => handleImageInputChange(index, e.target.value)}
                      value={imageUrl}
                      placeholder={`Image url ${index + 1}`}
                    />
                  </label>
                ))}
              </>
            )}
            <div className="Post-Submit-Button">
              <button className='cancel-button' onClick={() => navigate('/')}>Cancel</button>
              <button className={buttonDisabled ? 'disabled': 'enabled'} onClick={() => handleSubmitPost()} disabled={buttonDisabled}>Post</button>
            </div>
          </div>
        </div>
        <PostRules />
      </div>
    </div>
  );
}

export default CreatePostForm;
