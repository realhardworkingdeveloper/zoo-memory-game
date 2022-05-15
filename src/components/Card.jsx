import React from 'react'
import neartoken1 from '../assets/neartoken1.png'

export default function Card({ image, series, title, price, tag, time, buyVisible }) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt="near" />
            </div>
            <div className="card-content">
                <div className="card-heading">
                    <span className="card-series">{series}</span>
                    <span className="card-top">Top bid</span>
                </div>
                <div className="card-details">
                    <h4 className="card-title">{title}</h4>
                    <div className="card-price">
                        <img src={neartoken1} alt="super eth" />
                        <h4>{price} NEAR</h4>
                    </div>
                </div>
                <div className="card-sub-details">
                    <span>#{tag}</span>
                    <span>{time} sold</span>
                </div>
                <button className={`${buyVisible ? "" : "buy-visible"}`}>Buy Now</button>
            </div>
        </div>
    );
}
