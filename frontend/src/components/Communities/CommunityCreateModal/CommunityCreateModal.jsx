import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createCommunity } from '../../../redux/community';
import { useModal } from '../../../context/Modal';
import "./CommunityCreateModal.css";

function CommunityCreateModal() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");

    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNameChange = (newName) => {
        setName(newName);
        const newErrors = {...errors};
        if (newName.startsWith(' ')) newErrors.name = 'Name cannot start with spaces.';
        else if (newName.includes(' ')) newErrors.name = 'Name cannot contain spaces.';
        else if (newName.length === 0) newErrors.name = ''
        else if (newName.length <= 5) newErrors.name = 'Name must be longer than five characters.';
        else if (newName.length > 20) newErrors.name = 'Name is too long.';
        else newErrors.name = '';
        setErrors(newErrors);
        newName.length > 0 && !newErrors.name && description && !errors.description ? setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleDescriptionChange = (newDescription) => {
        setDescription(newDescription);
        const newErrors = {...errors};
        if (newDescription.startsWith(' ')) newErrors.description = 'Description cannot start with spaces.';
        else if (newDescription.length === 0) newErrors.description = ''
        else if (newDescription.length <= 5) newErrors.description = 'Description must be longer than five characters.';
        else if (newDescription.length > 255) newErrors.description = 'Description is too long.';
        else newErrors.description = '';
        setErrors(newErrors);
        newDescription.length > 0 && !newErrors.description && name && !errors.name ? setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleCreateCommunity = async () => {
        const newCommunityData = { name, description };
        const newCommunity = await dispatch(createCommunity(newCommunityData));

        closeModal();
        navigate(`/communities/${newCommunity.id}`)
    }

    return (
        <div className='Community-Modal-Container'>
            <div className='Community-Modal-Header'>
                <h3>Create a community</h3>
            </div>
            <div className='Community-Name-Container'>
                <h3>Name</h3>
                <p>Community names cannot be changed</p>
            </div>
            <div className='Community-Data-Input'>
                {errors && errors.name && <p id='edit-error2' className="errorDiv">{errors.name}</p>}
                <label>
                    <input onChange={(e) => handleNameChange(e.target.value)} placeholder='Community Name (Required)'/>
                </label>
                {errors && errors.description && <p id='edit-error2' className="errorDiv">{errors.description}</p>}
                <label>
                    <textarea onChange={(e) => handleDescriptionChange(e.target.value)} placeholder='Community Description (Required)'/>
                </label>
            </div>
            <div className="Post-Submit-Button2">
                <button className='cancel-button' onClick={() => closeModal()}>Cancel</button>
                <button className={buttonDisabled ? 'disabled2': 'enabled2'} onClick={() => handleCreateCommunity()} disabled={buttonDisabled}>Create Community</button>
            </div>
        </div>
    );
}

export default CommunityCreateModal;
