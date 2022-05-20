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
            title: "Yogi-Bear",
            price: 2,
            tag: "zoo.near",
            time: 4,
            buyVisible: false,
            bidText: "Top Bid"
        },
        {
            image: chickenRare,
            series: "Epic",
            title: "Firefly",
            price: 1,
            tag: "zoo.near",
            time: 5,
            buyVisible: false,
            bidText: "Top Bid"
        },
        {
            image: deerRare,
            series: "Mythical",
            title: "Woody",
            price: 6,
            tag: "zoo.near",
            time: 12,
            buyVisible: false,
            bidText: "Top Bid"
        },
        {
            image: foxRare,
            series: "Rare",
            title: "Foxie",
            price: 3,
            tag: "zoo.near",
            time: 9,
            buyVisible: false,
            bidText: "Top Bid"
        },
    ];

    return (
        <div className="super-rare">
            <div className="title-container">
                <h2 className="title">ZooMemory Marketplace</h2>
                <p className="description">
                    We have released four limited edition NFT's early which you can bid
                    in our <a href="/marketplace">Marketplace</a>.
                </p>
            </div>
            <div className="cards">
                {data.map(({ image, series, title, price, tag, time, buyVisible, buttonText, bidText }, index) => (
                    <Card
                        image={image}
                        series={series}
                        title={title}
                        price={price}
                        tag={tag}
                        time={time}
                        buyVisible={buyVisible}
                        buttonText={buttonText}
                        bidText={bidText}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
