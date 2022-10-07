import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import "../styles/SetAvatar.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/endpointAPI";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/12332";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please select an avatar", toastOption);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      await axios
        .post(`${setAvatarRoute}/${user._id}`, {
          avatarImage: avatars[selectedAvatar],
        })
        .then((res) => {
          if (res.data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = res.data.image;
            localStorage.setItem("chat-app-user", JSON.stringify(user));
            console.log('postImage', res.data)
            navigate('/')
          } else {
            toast.error("Error set avatar, Try Again", toastOption);
          }
        });
    }
  };

  const loadAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAvatar();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container">
          <div className="title-container">
            <h1>Select An Avatars</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt=""
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Avatar
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
}
