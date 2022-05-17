import React from "react";
import dogSignup from "../assets/dogSignup.png";

export default function SignUp() {
  return (
    <div className="signup" id="newsletter">
      <div className="container">
        <div className="content">
          <p className="sub-title">Newsletter</p>
          <h1 className="title">ZooMemory NFT</h1>
          <p className="description">
            Don't miss out on the release of our new NFT. Sign up below to
            recieve updates.
          </p>
          <button>Sign Up</button>
        </div>
        <div className="image-container">
          <div className="image">
            <img src={dogSignup} alt="home" />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
