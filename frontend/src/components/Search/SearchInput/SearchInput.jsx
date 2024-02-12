import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Random } from 'random-js'
import { useSelector } from "react-redux";
import "./SearchInput.css";
import { calculateTimeDifference } from "../../MainPosts/PostComponent";

function SearchInput() {
  const allCommunities = useSelector(state => state.communities?.allCommunities);

  const [searchInput, setSearchInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const randomInt = new Random();
  const [randomIndex, setRandomIndex] = useState(0);
  const [loading, SetLoading] = useState(true);
  const navigate = useNavigate();
  const ulRef = useRef();

  useEffect (() => {
    setRandomIndex(randomInt.integer(7, allCommunities?.length - 1))
    SetLoading(false);
  }, [allCommunities])

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(true);
  };


  const communityList = [];
  for (let community in allCommunities) {
    communityList.push({
      id: allCommunities[community].id,
      name: allCommunities[community].name,
      avatar: allCommunities[community].avatar,
      banner: allCommunities[community].banner,
      createdAt: allCommunities[community].createdAt
    });
  }

  const filteredCommunities = communityList.filter((community) => {
    const searchTerm = searchInput.toLowerCase();
    const communityName = community.name.toLowerCase();
    return searchTerm && communityName.startsWith(searchTerm);
  });

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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              />
          </label>
            {showMenu && (
                <div className="Search-Dropdown">
                    {/* <h3>Communities</h3> */}
                    {searchInput.length > 0 && (
                      <>
                        <h3 className="Dropdown-Tag">Search</h3>
                        {filteredCommunities.length === 0 && (
                          <h4 id="No-Results-Note">No results found</h4>
                        )}
                      </>
                    )}
                    {filteredCommunities.map((community) => (
                      <div
                      className="Search-Dropdown-Row"
                      key={`${community.id}`}
                      onClick={(e) => {
                            setSearchInput("");
                            setShowMenu(false);
                            navigate(`/communities/${community.id}`)
                          }}
                          >
                            {console.log(community.avatar, '-----------')}
                            <div className="Community-Avi-Container">
                                {community.avatar ? (
                                  <img src={community.avatar}></img>
                                ): (
                                  <i class="fa-solid fa-people-roof"></i>
                                )}
                                <h4>{community.name}</h4>
                              </div>
                            <p>Created {calculateTimeDifference(community.createdAt)}</p>
                      </div>
                    ))}
                      <div className="Other-Communities">
                        <h3 className="Dropdown-Tag">Discover more communities</h3>
                        {!loading ? allCommunities.slice(randomIndex - 7, randomIndex).map((community) => (
                          <div
                            className="Search-Dropdown-Row"
                            key={`${community.id}`}
                            onClick={(e) => {
                            setShowMenu(false);
                            setSearchInput("");
                            navigate(`/communities/${community.id}`)
                            }}
                            >
                              <div className="Community-Avi-Container">
                                {community.avatar ? (
                                  <img src={community.avatar}></img>
                                ): (
                                  <i class="fa-solid fa-people-roof"></i>
                                )}
                                <h4>{community.name}</h4>
                              </div>
                              <p>Created {calculateTimeDifference(community.createdAt)}</p>
                          </div>
                        )): (
                          <img src="../Rolling-1s-200px.svg"></img>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchInput;
