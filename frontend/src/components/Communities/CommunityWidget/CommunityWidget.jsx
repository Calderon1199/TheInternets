import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { editCommunity, getSingleCommunity } from '../../../redux/community';

import DeleteCommunityModal from '../CommunityModal';
import { useModal } from '../../../context/Modal';
import './CommunityWidget.css';

function CommunityWidget() {
    const community = useSelector(state => state.communities?.singleCommunity);
    const user = useSelector(state => state.session?.user);

    const [description, setDescription] = useState(community?.description);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditChange = (newDescription) => {
        const newErrors = {...errors};
        setDescription(newDescription);
        if (newDescription.startsWith(' ')) newErrors.description = 'Description cannot start with spaces';
        else if (newDescription.length <= 5) newErrors.description = 'Description must be longer than 5 characters';
        else newErrors.description = '';
        setErrors(newErrors)

        !newErrors.description && newDescription.length > 5? setButtonDisabled(false) : setButtonDisabled(true);
    }

    const handleEditComm = async (catId, name) => {
        const data = {
            description: description.trim(),
            name
        }
        await dispatch(editCommunity(catId, data))
        .then(() => {
            dispatch(getSingleCommunity(+catId));
        })
        .then(() => {
            setEditing(false);
        })
    }

    const handleDelete = async () => {
        return setModalContent(<DeleteCommunityModal community={community}/>);
    }

    const timestamp = new Date(community?.createdAt); // Replace this with your timestamp

    const formattedDate = timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className='Comm-Widget'>
            <div className='Comm-Widget2'>
                <p>About the Community</p>
                {community.userId === user?.id && (
                    <button onClick={() => handleDelete()}>Delete Community</button>
                )}
            </div>
            <div className='Comm-Description'>
                {!editing ? (
                    <p>{community?.description}</p>
                ): (
                    <div>
                        <textarea className='Description-Edit' defaultValue={community?.description} onChange={(e) => handleEditChange(e.target.value)}></textarea>
                        <div className='Submit-Edit-Comm'>
                            {errors && errors.description && <p id='edit-error-desc' className="errorDiv">{errors.description}</p>}
                            <div className='Comm-Buttons'>
                                <button id='cancel-button2' onClick={() => {
                                    setEditing(false);
                                    setErrors({});
                                }}>Cancel</button>
                                <button onClick={() => handleEditComm(community?.id, community.name)} id={buttonDisabled ? 'submit-edit-post-disabled': 'submit-edit-post-enabled'} disabled={buttonDisabled}>Update</button>
                            </div>
                        </div>
                    </div>

                )}
                <p><i className="fa-solid fa-cake-candles"></i> Created {formattedDate}</p>
            </div>
            <div className='Comm-Options'>
                <button onClick={() => navigate('/posts/new')} id='Post-Widget-Button'>Create Post</button>
                {community.userId === user?.id && (
                    <button onClick={() => !editing ? setEditing(true) : setEditing(false)} id='Community-Widget-Button'>Edit Description</button>
                )}
            </div>
        </div>
    );
}

export default CommunityWidget;
