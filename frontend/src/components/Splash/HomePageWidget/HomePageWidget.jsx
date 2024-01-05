import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useModal } from '../../../context/Modal';
import LoginFormModal from '../../LoginFormModal';

import CommunityCreateModal from '../../Communities/CommunityCreateModal';
import "./HomePageWidget.css";

function HomePageWidget() {
    const user = useSelector(state => state.session.user);
    
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    const visitCreate = (type) => {
        if (user && type === "community") {
            return setModalContent(<CommunityCreateModal />);
        } else if (user) {
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
                <button onClick={() => visitCreate("community")} id='Community-Widget-Button'>Create Community</button>
            </div>
        </div>
    );
}

export default HomePageWidget;
