import React, { useState } from 'react';
import "./CommunityCreateModal.css";
import { useDispatch } from 'react-redux';

function CommunityCreateModal() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createCommunity = () => {
        const newCommunityData = {
            name,
            description
        }
        dispatch(createCommunity(newCommunityData));
    }

    return (
        <div className='Community-Modal-Container'>
            <div>
                <h3>Create a community</h3>
            </div>
            <div>
                <h3>Name</h3>
                <p>Community names can be changed</p>
            </div>
            <div>
                <label>
                    <input onChange={(e) => setName(e.target.value)} placeholder='Community Name'/>
                </label>
                <label>
                    <input onChange={(e) => setDescription(e.target.value)} placeholder='Community Description'/>
                </label>
            </div>
            <div>
                <button>Cancel</button>
                <button onClick={() => createCommunity()}>Create Community</button>
            </div>
        </div>
    );
}

export default CommunityCreateModal;
