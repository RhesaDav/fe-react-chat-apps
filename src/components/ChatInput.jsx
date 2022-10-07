import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiWink } from "react-icons/bs";
import Picker from "emoji-picker-react";
import "../styles/ChatInput.scss";

export default function ChatInput({handleSendMessage}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideAndShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += e.emoji;
    setMsg(message);
    setShowEmojiPicker(!showEmojiPicker)
  };

  const sendChat = (e) => {
    e.preventDefault()
    if (msg.length>0) {
        handleSendMessage(msg)
        setMsg("")
    }
  }

  return (
    <div className="chat-input-container">
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your messages here ..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className="submit">
          <div className="emoji">
            <BsEmojiWink onClick={handleEmojiPickerHideAndShow} />
            {showEmojiPicker && (
              <Picker
                onEmojiClick={handleEmojiClick}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
