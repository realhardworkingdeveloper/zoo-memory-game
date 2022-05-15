import React from 'react'
import Card from "./Card";
import koalaRare from "../assets/koalaRare.png";
import chickenRare from "../assets/chickenRare.png";
import deerRare from "../assets/deerRare.png";
import foxRare from "../assets/foxRare.png";

export default function SuperRare() {
    const data = [
        {
            image: koalaRare,
            series: "Rare",
            title: "Purple Man",
            price: 2.99,
            tag: 12983,
            time: 4,
        },
        {
            image: chickenRare,
            series: "Epic",
            title: "Beige",
            price: 2.99,
            tag: 12983,
            time: 5,
        },
        {
            image: deerRare,
            series: "Mythical",
            title: "Red Man",
            price: 2.99,
            tag: 12983,
            time: 12,
        },
        {
            image: foxRare,
            series: "Rare",
            title: "Green",
            price: 2.99,
            tag: 12983,
            time: 9,
        },
    ];

    return (
        <div className="super-rare">
            <div className="title-container">
                <h2 className="title">LE Super Rare Auction</h2>
                <p className="description">
                    We have released four limited edition NFT's early which which can be
                    bid on via <a href="#">Paras</a>.
                </p>
            </div>
            <div className="cards">
                {data.map(({ image, series, title, price, tag, time, buyVisible }, index) => (
                    <Card
                        image={image}
                        series={series}
                        title={title}
                        price={price}
                        tag={tag}
                        time={time}
                        buyVisible={buyVisible}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
