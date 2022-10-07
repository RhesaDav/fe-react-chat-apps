import React from "react";
import '../styles/Welcome.scss'

export default function Welcome({currentUser}) {
  return (
    <div className="container-welcome">
      <img src="https://img.freepik.com/free-photo/friendly-smiling-girl-waving-hand-say-hi-greeting-someone_1258-19038.jpg?w=740&t=st=1665072871~exp=1665073471~hmac=c9a646f2df472e4f7d2458fd86ff1456d4ad516d05856185bee02d605b73f192" alt="" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please Select Chat To Messaging</h3>
    </div>
  );
}
