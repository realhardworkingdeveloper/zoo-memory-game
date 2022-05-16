import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import giraffe1 from '../assets/giraffe1.png'
import catRelease from '../assets/catRelease.png'
import Card from './Card'

export default function Release() {
    return (
        <div className="releases">
            <div className="release orange">
                <div className="content">
                    <h2 className="title">How to Play?</h2>
                    <p className="description">
                        In game you have to flip similar cards. To pass level you need to flip all cards.
                        {/*<a href="#">Paras</a>*/}
                    </p>
                    <p className="description">
                        Every time you pass the level you will get certain amount of crystals.
                    </p>
                    <p className="description">By owning crystals, you get ZooMemory token <a href="#">$ZMC</a></p>
                    <a href="#" className="link">
                        More Info <BsArrowRight />
                    </a>
                </div>
                <div className="image">
                    <img src={giraffe1} alt="release" />
                    <div className="ellipse pink"></div>
                </div>
            </div>
            <div className="release green">
                <div className="card-container">
                    <Card
                        image={catRelease}
                        series="RARE"
                        title="Purple Man"
                        price={3.95}
                        tag="1094"
                        time={2}
                        bidText={"Top Bid"}
                    />
                    <div className="ellipse orange"></div>
                </div>
                <div className="content">
                    <h2 className="title">Zoos in Ukraine</h2>
                    <p className="description">
                        Once you have $ZMC tokens, you can spend them and buy NFT character in our&nbsp;
                        <a href="#">Marketplace</a>
                    </p>
                    <p className="description">
                        The money collected from sales will go directly to support zoos in Ukraine.

                    </p>
                    <p className="description">50% of royalties will go to zoos.</p>
                    <a href="#" className="link">
                        Help Zoos <BsArrowRight />
                    </a>
                </div>
            </div>
        </div>
    );
}
