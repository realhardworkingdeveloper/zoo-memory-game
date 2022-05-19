import React from "react";
import zootoken from "../assets/zootoken.png";
import neartoken from "../assets/nearwhite1.png"

export default function Card({
  image,
  series,
  title,
  price,
  tag,
  time,
  buyVisible,
  buttonText,
  bidText,
  onClick,
  onClickBtn,
  btnDisabled,
})
{
  const accountInfo = () => {
    window.open(`https://explorer.testnet.near.org/accounts/${tag}`, "_blank");
  };
  return (
    <div className="card">
      <div className="card-image" onClick={onClick}>
        <img src={image} alt="near" style={{ maxWidth: "300px" }} />
      </div>
      <div className="card-content">
        <div className="card-heading">
          <span className="card-series">{series}</span>
          <span className="card-top">{bidText}</span>
        </div>
        <div className="card-details">
          <h4 className="card-title" onClick={onClick}>
            {title}
          </h4>
          <div className="card-price">
            <img src={neartoken} alt="super eth" />
            <h4>{price} NEAR</h4>
          </div>
        </div>
        <div className="card-sub-details">
          <span
          onClick={accountInfo}
          style={{"cursor": "pointer"}}
          >@{tag}</span>
          {/* <span>{time || 0} sold</span> */}
          {/* <span>#12313{time}</span> */}
        </div>

        <button
          className={`${buyVisible ? "" : "buy-visible"}`}
          onClick={onClickBtn}
          disabled={btnDisabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
