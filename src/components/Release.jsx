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
                    <h2 className="title">Initial Release 4/11</h2>
                    <p className="description">
                        We have released four limited edition NFTs early which can be bid on
                        via <a href="#">Paras</a>
                    </p>
                    <p className="description">
                        There will be the only four of these NFTs we ever make, so be sure
                        not to miss out!
                    </p>
                    <p className="description">50% of proceeds go to charity.</p>
                    <a href="#" className="link">
                        Check them out <BsArrowRight />
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
                    />
                    <div className="ellipse orange"></div>
                </div>
                <div className="content">
                    <h2 className="title">Initial Release 4/11</h2>
                    <p className="description">
                        We have released four limited edition NFTs early which can be bid on
                        via <a href="#">Paras</a>
                    </p>
                    <p className="description">
                        There will be the only four of these NFTs we ever make, so be sure
                        not to miss out!
                    </p>
                    <p className="description">50% of proceeds go to charity.</p>
                    <a href="#" className="link">
                        Check them out <BsArrowRight />
                    </a>
                </div>
            </div>
        </div>
    );
}
