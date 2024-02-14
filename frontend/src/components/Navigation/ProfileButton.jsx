import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { thunkLogout } from "../../redux/session";

import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

function ProfileButton() {
  const user = useSelector(state => state.session?.user);

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/');
    closeMenu();
  };

  return (
    <div className="Profile-Button">
      <button className="profile-button" onClick={toggleMenu}>
        <div className="Profile-Button-Text">
          {user ? (
            <div className="Profile-Img">
              {user.profileImg ? (
                <img src={user.profileImg}></img>
              ): (
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
              )}
              <p>{user.username}</p>
            </div>
          ): (
            <h3>...loading</h3>
          )}
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="Dropdown-Info">
              <li className="Dropdown-li-Intro">Hello, {user?.username}!</li>
              <li className="dropdown-li">
                <button className="dropdown-button" onClick={() => {
                  navigate("/profile")
                  setShowMenu(false)}
                }><i className="fa-regular fa-user"></i>Profile</button>
              </li>
              <li className="dropdown-li">
                <button className="dropdown-button" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Log Out</button>
              </li>
            </div>
          ) : (
            <div className="Modal-Options">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
