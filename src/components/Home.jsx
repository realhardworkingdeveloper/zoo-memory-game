import React from "react";
import tiger from "../assets/tiger1.png";
import { useNavigate } from "react-router-dom";



export default function Home() {
  let navigate = useNavigate();
  const playgame = () => {
    let path = `/game`;
    navigate(path);
  }
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <p className="sub-title">Zoomemory collection</p>
          <h1 className="title">Let Zoos flourish</h1>
          <p className="description">
            Boost up your memory and help zoos in Ukraine by playing games.
            Also check out our Marketplace for cool NFTs.
          </p>
          <button onClick={playgame}>Play Game</button>
        </div>
        <div className="image-container">
          <div className="image">
            <img src={tiger} alt="home" />
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
