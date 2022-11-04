import { Person, Event, Search } from "@mui/icons-material";
import "./NavBar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import BasicModal from "../Modal/BasicModal";
import { AppContext } from "../../App";

const NavBar = ({ allUsers }) => {
  const { setUser } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/users?keyword=${search.toLowerCase()}`)
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    handleShow();
  };

  return (
    <>
      <div className="navbar-div">
        <div className="site-functions">
          <div className="icon-container">
            <img
              src="logo512.png"
              alt="logo"
              className="logo-icon"
              onClick={() => navigate("/")}
            />
          </div>

          <div></div>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="flex flex-row h-12 border-neutral-400 border-2 p-1">
              <input
                type="search"
                name="keywords"
                placeholder="Search users"
                value={search}
                onChange={(e) => handleChange(e)}
              ></input>
              <button type="submit">
                <Search />
              </button>
            </div>
          </form>
        </div>
        <div className="nav-item-container">
          <div className="icon-container">
            <Link to={`/events`}>
              <Event className="header-icon" />
            </Link>
          </div>
          <div className="icon-container">
            <Link to={`/profile`}>
              <Person className="header-icon" />
            </Link>
          </div>
          <div className="icon-container">
            <LogoutIcon className="header-icon" onClick={handleLogout} />
          </div>
        </div>
      </div>
      {show && (
        <BasicModal
          show={show}
          setShow={setShow}
          title="Success"
          message="You are now logged out!"
          navigateTo="/"
        />
      )}
    </>
  );
};

export default NavBar;
