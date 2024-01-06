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
    const [errors, setErrors] = useState({postText: "", title: "", images: "", community: ""});
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
    title.length > 5 ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    const newErrors = { ...errors };
    if (e.target.value.startsWith(' ')) {
      newErrors.title = 'Title cannot start with spaces.';
    } else if (e.target.value.length <= 5) {
      newErrors.title = 'Title must be longer than five characters.';
    }  else if (e.target.value.length > 255) {
      newErrors.title = 'Title is too long.';
    } else {
      newErrors.title = '';
    }
  setErrors(newErrors);
    !newErrors.title && selectedCommunity ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleImageInputChange = (index, imageUrl) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = imageUrl;
      return updatedImages;
    });

    const newErrors = { ...errors };

    if (imageUrl.length === 0) {
      newErrors.images = '';
    } else if (!imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg') && !imageUrl.endsWith('.png')){
      newErrors.images = 'Images must end in .jpg, .jpeg, or .png';
    } else {
      newErrors.images = '';
    }

    setErrors(newErrors);
    title.length > 5 && selectedCommunity && !e.target.value.startsWith(' ') ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleChangePostText = (e) => {
    setPostText(e.target.value);
    const newErrors = { ...errors };
    if (e.target.value.length === 0) {
      newErrors.postText = "";
    } else if (e.target.value.startsWith(' ')) {
      newErrors.postText = 'Description cannot start with spaces.';
    } else if (e.target.value.length <= 5) {
      newErrors.postText = 'Title must be longer than five characters.';
    } else {
      newErrors.postText = '';
    }
    setErrors(newErrors);
  };

  const handleSubmitPost = async () => {
      const newErrors = { ...errors };

      if (selectedCommunity === null) {
        newErrors.community = 'Please choose a community.';
      }
      if (title.startsWith(' ')) {
        newErrors.title = 'Title cannot start with spaces.';
      } else if (title.length <= 5) {
        newErrors.title = 'Title must be longer than five characters.';
      } else {
        newErrors.title = '';
      }

    title.length > 5 && selectedCommunity && !title.startsWith(' ') && !postText.startsWith(' ')? setButtonDisabled(false) : setButtonDisabled(true);

      setErrors(newErrors);

    const postData = {
      title: title.trim(),
      postText: postText.trim(),
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
              {selectedCommunity ? selectedCommunity.name : 'Select Community (required)'}
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
                {errors && errors.community && <p className="errorDiv">{errors.community}</p>}
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
                        placeholder="Title (required)"
                        />
                    </label>
                    {errors.title && <p className="errorDiv">{errors.title}</p>}
                    <label>
                    <textarea
                        type="text"
                        className="Text-Input"
                        onChange={(e) => handleChangePostText(e)}
                        value={postText}
                        placeholder="Text (optional)"
                    />
                    </label>
                    {errors.postText && <p className="errorDiv">{errors.postText}</p>}
                </>
            ): (
                <>
                    <h3 id='image-rules'>Choose up to three images</h3>
                    {errors.images && <p className="errorDiv">{errors.images}</p>}
                {images.map((imageUrl, index) => (
                  <div>
                    <label key={index}>
                      <input
                        type="text"
                        className="Title-Input"
                        onChange={(e) => handleImageInputChange(index, e.target.value)}
                        value={imageUrl}
                        placeholder={`Image url ${index + 1}`}
                        />
                    </label>
                  </div>
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
