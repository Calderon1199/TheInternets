import { useEffect, useState } from "react";
import "./CommunityCard.css"
import { useNavigate } from "react-router-dom";

function CommunityCard({userCommunities}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (userCommunities) setLoading(false)
    },[])

    if (loading) {
        return (
            <div className='Loading-Profile'>
                <img src='./Rolling-1s-200px.svg'></img>
            </div>
        )
    }

    return (
        <div className="User-Comm-Container">
            <div className="Comm-Header-Profile">
                <h4>You're an owner of these communities</h4>
            </div>
            <div className="User-Comm-Inner">
                {userCommunities?.map((comm) => (
                    <div className="User-Comm-Info" key={comm.id} onClick={() => navigate(`/communities/${comm.id}`)}>
                        <div className="Comm-Img">
                            <img src={comm.avatar ? comm.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}></img>
                        </div>
                        <div className="User-Comm-Name">
                            <h5>{comm.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommunityCard;
