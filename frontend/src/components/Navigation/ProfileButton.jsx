import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(state => state.session?.user);
  const ulRef = useRef();

  const visitProfile = () => {
    navigate("/profile")
  }

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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
    closeMenu();
  };

  return (
    <div className="Profile-Button">
      <button className="profile-button" onClick={toggleMenu}>
        <div className="Profile-Button-Text">
          <i className="fa-solid fa-user-astronaut"></i>{user?.username}
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="Dropdown-Info">
              <li>{user?.username}</li>
              <li>{user?.email}</li>
              <li>
                <button className="dropdown-button" onClick={visitProfile}><i class="fa-regular fa-user"></i>Profile</button>
              </li>
              <li>
                <button className="dropdown-button" onClick={logout}><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</button>
              </li>
            </div>
          ) : (
            <>
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
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
