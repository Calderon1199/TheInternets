import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUserEdit } from "../../redux/session";
import './ImageEdit.css';
import { useModal } from "../../context/Modal";

function ImageEditModal() {
    const user = useSelector(state => state.session.user);
    const [username, setUsername] = useState(user.username);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [avatar, setAvatar] = useState(user.profileImg);
    const [errors, setErrors] = useState({});

    const {closeModal} = useModal();
    const dispatch = useDispatch();


    const handleAvatarChange = (newAvatar) => {
        const newErrors = { ...errors };
        setAvatar(newAvatar);

        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const contains = allowedExtensions.some(ext => newAvatar.endsWith(ext));
        newErrors.avatar = contains ? '' : 'Avatar must end with .jpg, .jpeg, or .png';
        setErrors(newErrors);
        console.log(buttonDisabled)
        !newErrors.avatar && !newErrors.username ?  setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleUsernameChange = (newUsername) => {
        const newErrors = {...errors};
        setUsername(newUsername);

         if (newUsername.length < 4 || newUsername.length > 30) {
            newErrors.username = 'Username must be between 4 and 30 characters long.';
        } else {
            const regex = /^[a-zA-Z0-9_-]+$/;
            if (!regex.test(newUsername)) {
                newErrors.username = 'Username can only contain letters, numbers, dashes, and underscores.';
            } else {
                newErrors.username = '';
            }
        }
        setErrors(newErrors);
        !newErrors.avatar && !newErrors.username ?  setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleSubmit = () => {
        const data = {profileImg: avatar, username}
        if (!errors.avatar && !errors.username) {
            dispatch(thunkUserEdit(data));
        }
        closeModal();
    }
    return (
        <div className="Avatar-Modal-Container">
            <div className="Edit-Avatar-Img">
                <img alt="Profile Avatar" src={user.profileImg}></img>
                <i class="fa-solid fa-xmark" id="exit" onClick={() => closeModal()}></i>
            </div>
            <div className="Account-Info">
                <h4>{user.username}</h4>
                <h5>{user.email}</h5>
            </div>
            <div className="Avatar-Input-Container">
                <div className="Avatar-Header">
                    <p className="User-Edit-Section">Avatar</p>
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
                {errors.username && <p className="errorDiv">{errors.username}</p>}
                <p className="User-Edit-Section">Username</p>
                <label>
                    <input
                        type="text"
                        className="Username-Input"
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        value={username}
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

export default ImageEditModal;
