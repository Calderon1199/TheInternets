import React, { useState } from 'react';
import "./CommunityCreateModal.css";
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCommunity } from '../../../redux/community';
function CommunityCreateModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { closeModal } = useModal();

    const handleCreateCommunity = async () => {
        const newCommunityData = {
            name,
            description
        }
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
