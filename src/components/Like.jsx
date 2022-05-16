import React from 'react'
import nearua from '../assets/nearua.png'
import near1 from '../assets/near1.png'

export default function Like() {
    return (
        <div className="like">
            <div className="container">
                <div className="content">
                    <div className="image">
                        <img src={near1} alt="eth1" />
                    </div>
                    <h2 className="title">NEAR Protocol</h2>
                    <p className="description">
                        Don't miss out on the release of our new NFT. Sign up below to
                        recieve updates when we go live on 11/22.
                    </p>
                    <p className="description">
                        Don't miss out on the release of our new NFT. Sign up below to
                        recieve updates when we go live on 11/22. Don't miss out on the
                        release of our new NFT.
                    </p>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={nearua} alt="eth2" />
                    </div>
                    <h2 className="title">NEAR UA Hackathon 2022</h2>
                    <p className="description">
                        Don't miss out on the release of our new NFT. Sign up below to
                        recieve updates when we go live on 11/22.
                    </p>
                    <p className="description">
                        Don't miss out on the release of our new NFT. Sign up below to
                        recieve updates when we go live on 11/22. Don't miss out on the
                        release of our new NFT.
                    </p>
                </div>
            </div>
        </div>
    );
}
