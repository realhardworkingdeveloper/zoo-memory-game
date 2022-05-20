import React, { memo, useState } from "react";
import zootoken from "../assets/zootoken.png";
import neartoken from "../assets/nearwhite1.png";
import useInterval from "../hooks/use-interval";
import { getDaysHrsMnsSecs } from "../utils/date-time";

const Card = ({
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
  startTime,
  endTime,
  type = "marketplace",
}) => {
  // const offset = new Date().getTimezoneOffset() * 60 * 1000;

  const [timeInSeconds, setTimeInSeconds] = useState(
    parseInt((endTime - Date.now()) / 1000)
  );
  const [timeToStart, setTimeToStart] = useState(
    parseInt((startTime - Date.now()) / 1000) // TODO: account for timezone offset: ;
  );

  const accountInfo = () => {
    window.open(`https://explorer.testnet.near.org/accounts/${tag}`, "_blank");
  };

  useInterval(() => {
    if (timeToStart > 0) {
      setTimeToStart(timeToStart - 1);
    }

    if (timeInSeconds > 0) {
      setTimeInSeconds(timeInSeconds - 1);
    }
  }, 1000);

  // console.log({ title, startTime, endTime, time_now: Date.now() });

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
          <span onClick={accountInfo} style={{ cursor: "pointer" }}>
            @{tag}
          </span>
          {/* <span>{time || 0} sold</span> */}
          {/* <span>#12313{time}</span> */}
        </div>

        {/* TODO: update logic here for bid/instant */}
        {type === "auction" && !!startTime && (
          <div>
            {endTime > Date.now() && startTime < Date.now() ? (
              <span>{getDaysHrsMnsSecs(timeInSeconds)}</span>
            ) : timeToStart > 0 ? (
              <span>Bid starts in {getDaysHrsMnsSecs(timeToStart)}</span>
            ) : (
              <span>Bid closed</span>
            )}
          </div>
        )}

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
};

export default memo(Card);
