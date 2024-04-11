import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import { getCommunities } from "../../redux/community";
import SearchInput from "../Search/SearchInput";
import { useEffect } from "react";

function Navigation() {
  const user = useSelector(state => state.session?.user);
  const dispatch = useDispatch();

  const { setModalContent } = useModal();
  const navigate = useNavigate();
  const urlPath = "/posts/new";

  useEffect(() => {
    dispatch(getCommunities())
  })

  const handleNavLinkClick = () => {
    if (!user) {
      return setModalContent(<LoginFormModal />);
    } else {
      navigate('/posts/new')
    }
  };

  return (
    <div className="Nav-Container">
      <ul className="Nav-Options">
        <li className="Logo-Li">
          <NavLink className="NavLinkLogo" to="/">
              <p id="right-logo">The Internets</p>
          </NavLink>
        </li>
        <SearchInput />
        <div className="Right-Side-Navigation">
          <li>
            <h4 className="NavLink" onClick={handleNavLinkClick}>
              Create a post
            </h4>
            <h4 className="NavLink2" onClick={handleNavLinkClick}>
              <i class="fa-solid fa-plus"></i>
            </h4>
          </li>
          <li className="Profile-Button-Container">
            {user ? (
              <ProfileButton />
            ) : (
              <button className="Login-Button" onClick={() => setModalContent(<LoginFormModal />)}>Log in</button>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
