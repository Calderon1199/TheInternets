import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createCommunity } from '../../../redux/community';
import { useModal } from '../../../context/Modal';

import "./CommunityCreateModal.css";

function CommunityCreateModal() {
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");

    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                <p>Community names can be changed</p>
            </div>
            <div className='Community-Data-Input'>
                <label>
                    <input onChange={(e) => setName(e.target.value)} placeholder='Community Name'/>
                </label>
                <label>
                    <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Community Description'/>
                </label>
            </div>
            <div className='Community-Modal-Buttons'>
                <button onClick={() => closeModal()}>Cancel</button>
                <button id='Create-Com-Button' onClick={() => handleCreateCommunity()}>Create Community</button>
            </div>
        </div>
    );
}

export default CommunityCreateModal;
