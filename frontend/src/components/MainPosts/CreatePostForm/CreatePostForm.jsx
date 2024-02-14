import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getCommunities } from '../../../redux/community';
import { createPost } from '../../../redux/post';
import PostRules from '../PostRules';

import './CreatePostForm.css';

function CreatePostForm({postCommunity}) {
    const communities = useSelector(state => state.communities?.allCommunities);
    const location = useLocation();

    const [errors, setErrors] = useState({postText: "", title: "", images: "", community: ""});

    const [selectedCommunity, setSelectedCommunity] = useState(location.state?.community ? location.state?.community : null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [images, setImages] = useState(['', '', '']);
    const [titleCount, setTitleCount] = useState(0);
    const [infoType, setInfoType] = useState(true);
    const [postText, setPostText] = useState('');
    const [title, setTitle] = useState('');

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
    title.length > 5 && title.length < 255 ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    setTitleCount(e.target.value.length)
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
    if (e.target.value.length === 0) newErrors.title = '';
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
    title.length > 5 && selectedCommunity && !imageUrl.startsWith(' ') ? setButtonDisabled(false) : setButtonDisabled(true);
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
          <div className="Community-Dropdown">
            <div className='Community-Dropdown-Input' ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
              <i class="fa-solid fa-user-group"></i>
              <div className='Dropdown-Input'>
                <input
                    placeholder={!selectedCommunity ? 'Choose a community' : `${selectedCommunity.name}`}
                    disabled
                />
              </div>
              <div className='Community-Carrot'>
                <i class="fa-solid fa-sort-down" onClick={() => setShowDropdown(!showDropdown)}></i>
              </div>
            </div>
            {showDropdown && (
              <div className="Community-Dropdown-Options">
                {communities.map((community) => (
                    <div className='Community-Name-Container' key={community.id}>
                        <div className='Community-Name' onClick={() => handleCommunityClick(community)}>
                          <div className='Comm-Img'>
                            <img src={community.avatar ? community.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}></img>
                          </div>
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
                      <span className='Char-Count'>{titleCount} / 255</span>
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
                    <p id='post-image-warning'>Images cannot be edited</p>
                    {errors.images && <p className="errorDiv">{errors.images}</p>}
                {images.map((imageUrl, index) => (
                  <div key={index}>
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
