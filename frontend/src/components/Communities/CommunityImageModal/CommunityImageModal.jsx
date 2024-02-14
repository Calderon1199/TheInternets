import { useEffect, useState } from "react";
import { editCommunity } from "../../../redux/community";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

function CommunityImageModal({community}) {
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState(community?.avatar);
    const [banner, setBanner] = useState(community?.banner);
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (community) setLoading(false);
    },[])

    const handleAvatarChange = (newAvatar) => {
        const newErrors = { ...errors };
        setAvatar(newAvatar);
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const contains = allowedExtensions.some(ext => newAvatar.endsWith(ext));
        newErrors.avatar = contains ? '' : 'Avatar must end with .jpg, .jpeg, or .png';
        setErrors(newErrors);
        !newErrors.avatar && !newErrors.banner ?  setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleBannerChange = (newBanner) => {
        const newErrors = { ...errors };
        setBanner(newBanner);
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const contains = allowedExtensions.some(ext => newBanner.endsWith(ext));
        newErrors.banner = contains ? '' : 'Banner must end with .jpg, .jpeg, or .png';
        setErrors(newErrors);
        !newErrors.avatar && !newErrors.banner ?  setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleSubmit = () => {
        const data = {avatar, banner, description: community.description, name: community.name}
        if (!errors.avatar && !errors.banner) {
            dispatch(editCommunity(community.id, data));
        }
        closeModal();
    }

    return (
        <div className="Avatar-Modal-Container">
            <div className="Edit-Avatar-Img">
                <img src={community.avatar}></img>
                <i className="fa-solid fa-xmark" id="exit" onClick={() => closeModal()}></i>
            </div>
            <div className="Account-Info">
                <h4>{community.name}</h4>
            </div>
            <div className="Avatar-Input-Container">
                <div className="Avatar-Header">
                    <p className="User-Edit-Section">Community Picture</p>
                    {errors.avatar && <p className="errorDiv">{errors.avatar}</p>}
                </div>
                <label>
                    <input
                        type="text"
                        className="Avatar-Input"
                        onChange={(e) => handleAvatarChange(e.target.value)}
                        value={avatar}
                        />
                </label>
            </div>
            <div className="Avatar-Input-Container">
                {errors.banner && <p className="errorDiv">{errors.banner}</p>}
                <p className="User-Edit-Section">Community Banner</p>
                <label>
                    <input
                        type="text"
                        className="Username-Input"
                        onChange={(e) => handleBannerChange(e.target.value)}
                        value={banner}
                        />
                </label>
            </div>
            <div className="User-Data-Buttons">
                <button className='cancel-button' onClick={() => closeModal()}>Cancel</button>
                <button className={buttonDisabled ? 'disabled': 'enabled'} onClick={() => handleSubmit()} disabled={buttonDisabled}>Submit</button>
            </div>
        </div>
    );
}

export default CommunityImageModal;
