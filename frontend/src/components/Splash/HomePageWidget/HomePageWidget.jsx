import React from 'react';
import "./HomePageWidget.css";
import { useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useNavigate } from 'react-router-dom';
import LoginFormModal from '../../LoginFormModal';

function HomePageWidget(props) {
    const user = useSelector(state => state.session?.user);
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const visitCreate = () => {
        if (user) {
            navigate("/posts/new")
        } else {
            return setModalContent(<LoginFormModal />)
        }
    }


    return (
        <div className='Home-Widget-Container'>
            <div className='Home-Widget-Header'>
                <h3>Home</h3>
            </div>
            <div className='Home-Widget-Text'>
                <p>Your personal InstaChat frontpage. Come here to check in with your favorite communities.</p>
            </div>
            <div className='Home-Widget-Buttons'>
                <button onClick={() => visitCreate()} id='Post-Widget-Button'>Create Post</button>
                <button id='Community-Widget-Button'>Create Community</button>
            </div>
        </div>
    );
}

export default HomePageWidget;
