import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  return (
    <div className="Nav-Container">
      <ul className="Nav-Options">
        <li>
          <NavLink className="NavLink" to="/">Home</NavLink>
        </li>
        <div className="Right-Side-Navigation">
          <li>
            <NavLink className="NavLink" to="/posts/new">Create a post</NavLink>
          </li>
          <li>
            <ProfileButton />
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
