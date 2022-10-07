import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.scss";

export default function Contacts({
  contacts,
  currentUser,
  changeChat,
  setContacts,
}) {
  const navigate = useNavigate();
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  const detailFilter = contacts.filter((item) => {
    return item.username.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    if (currentUser) {
      setCurrentImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <div className="container-contact">
        <div className="current-user">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentImage}`} alt="" />
          </div>
          <div className="username">
            <h3>{currentUsername}</h3>
            <h4>My Account</h4>
          </div>
          <div className="icon">
            <FiMoreVertical onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown === true ? (
              <div className="dropdown">
                <h5
                  className="selection"
                  onClick={() => navigate("/set-avatar")}
                >
                  Change Avatar
                </h5>
                <h5 className="selection" onClick={handleLogout}>
                  Logout
                </h5>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="search">
          <div className="inner-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search or start a new chat ..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="contacts">
          {detailFilter.map((contact, index) => {
            return (
              <div
              key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                    width="100"
                    height="100"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="current-user">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentImage}`} alt="" />
          </div>
          <div className="username">
            <h3>{currentUsername}</h3>
            <span>My Account</span>
          </div>
        </div> */}
      </div>
    </>
  );
}
