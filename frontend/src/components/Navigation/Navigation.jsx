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
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const { setModalContent } = useModal();
  const navigate = useNavigate();
  const urlPath = "/posts/new";

  useEffect(() => {
    dispatch(getCommunities())
  })

  const handleNavLinkClick = () => {
    if (!user) {
      setModalContent(<LoginFormModal />);
    } else {
      navigate(urlPath);
    }
  };

  return (
    <div className="Nav-Container">
      <ul className="Nav-Options">
        <li>
          <NavLink className="NavLink" to="/">
            <img src="/the-internets-high-resolution-logo-transparent.png" />
          </NavLink>
        </li>
        <SearchInput />
        <div className="Right-Side-Navigation">
          <li>
            <NavLink className="NavLink" to={urlPath} onClick={handleNavLinkClick}>
              Create a post
            </NavLink>
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
