import { useEffect, useRef, useState } from "react";
import "./SearchInput.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function SearchInput() {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const allCommunities = useSelector(state => state.communities?.allCommunities);
    const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(true);
  };

  const communityList = [];
  for (let community in allCommunities) {
    communityList.push({
      id: allCommunities[community].id,
      name: allCommunities[community].name,
    });
  }

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);


    return (
        <div className="Site-Search"  ref={ulRef}>
          <label>
            <input
              type="text"
              className="Site-Search-Input"
              placeholder="Search The Internets"
              onClick={toggleMenu}
              onChange={(e) => setSearchInput(e.target.value)}
              />
          </label>
            {showMenu && (
                <div className="Search-Dropdown">
                    <h3>Communities</h3>
                    {communityList
                        .filter((community) => {
                        const searchTerm = searchInput.toLowerCase();
                        const communityName = community.name.toLowerCase();
                        return searchTerm && communityName.startsWith(searchTerm);
                        })
                        .map((community) => (
                            <div
                                className="Search-Dropdown-Row"
                                key={`${community.id}`}
                                onClick={() => {
                                setSearchInput("");
                                navigate(`/communities/${community.id}`)
                                }}
                            >
                                <div>{community.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchInput;
