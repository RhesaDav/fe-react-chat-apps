import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client'
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import "../styles/Chat.scss";
import { allUsersRoute, server } from "../utils/endpointAPI";

export default function Chat() {
  const socket = useRef()
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false)

  async function localStorageHandle() {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      const getItem = await JSON.parse(localStorage.getItem("chat-app-user"))
      setCurrentUser(getItem);
      setIsLoaded(true)
    }
  }

  async function handleRoute() {
    if (currentUser) {
      // console.log("cek", currentUser);
      if (currentUser.isAvatarImageSet) {
        await axios.get(`${allUsersRoute}/${currentUser._id}`).then((res) => {
          setContacts(res.data);
        });
      } else {
        navigate("/set-avatar");
      }
    }
  }

  useEffect(() => {
    if(currentUser) {
      socket.current = io(server)
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    localStorageHandle();
  }, []);

  useEffect(() => {
    handleRoute();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="container-chat">
      <div className="inner-container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          setContacts={setContacts}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </div>
    // </div>
  );
}
