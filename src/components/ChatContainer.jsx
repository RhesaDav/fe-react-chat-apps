import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import "../styles/ChatContainer.scss";
import { addMessageRoute, getAllMessagesRoute } from "../utils/endpointAPI";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const scrollRef = useRef()
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage]= useState(null)

  const getMessages = async () => {
    if (currentChat)  {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    await axios
      .post(addMessageRoute, {
        sender: currentUser._id,
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      })
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: msg
      })

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg});
      setMessages(msgs);
  };

  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg
        })
      })
    }
   },[])

   useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev,arrivalMessage])
   }, [arrivalMessage])

   useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
   }, [messages])

  return (
    <>
      {currentChat && (
        <div className="container-chat-container">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            {/* <Logout /> */}
          </div>
          <div className="chat-messages">
            {messages.map((msg) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      msg.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <Messages /> */}
          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
}
