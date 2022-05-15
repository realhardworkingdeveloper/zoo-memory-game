import React from 'react'
import icon from '../assets/icon.png'
import elephant from '../assets/elephant.png'
import croc from '../assets/croc.png'
import Card from './Card'

export default function Free() {
    return (
        <div className="free">
            <div className="container">
                <div className="background">
                    <div className="ellipse pink"></div>
                    <div className="ellipse green"></div>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={icon} alt="icon" />
                    </div>
                    <h2 className="title">Free NFT for early birds</h2>
                    <p className="description">
                        Sign up today and you'll get a free NFT when we launch
                    </p>
                </div>
            </div>
            <div className="cards">
                <div className="card1">
                    <Card
                        image={elephant}
                        series="Uncommon"
                        title="Purple Phant"
                        price={2.99}
                        tag={"zoo.near"}
                        time={1}
                    />
                </div>
                <div className="card2">
                    <Card
                        image={croc}
                        series="Uncommon"
                        title="Purple Man"
                        price={3.95}
                        tag="1094"
                        time={2}
                    />
                </div>
            </div>
        </div>
    );
}
