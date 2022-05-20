import React from 'react'
import nearua from '../assets/nearua.png'
import near1 from '../assets/near1.png'
import zoocoin from '../assets/zoocoin.png'

export default function Like() {
    return (
        <div className="like">
            <div className="container">
                <div className="content">
                    <div className="image">
                        {/* <img src={near1} alt="near" /> */}
                        <img src={zoocoin} alt="zoocoin" />
                    </div>
                    <h2 className="title">ZooMemory Token</h2>
                    <p className="description">
                        Our <a href="https://github.com/near/NEPs/blob/master/neps/nep-0141.md" target={"_blank"}>NEP-141</a> standard token is called ZMC. It serves as the in-game currency.
                        It can be earned by playing games, staking tokens and NFTs
                    </p>
                    <p className="description">
                        You can spend it on buying NFTs, on donations to zoos, crafting rarer NFTs, breeding NFT animals.
                        You can also buy/sell tokens on the exchange.
                    </p>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={nearua} alt="near" />
                    </div>
                    <h2 className="title">Hackathon "For Ukraine" by NEAR UA</h2>
                    <p className="description">
                        Special thanks to <a href="https://www.nearua.com/" target={"_blank"}>NEAR UA</a> for providing this opportunity and which helped
                        us realizing our idea
                    </p>
                    <p className="description">
                        We will continiously work on this project and improve it. Because we belive that it will have huge impact on helping zoo not only in Ukraine but global
                    </p>
                </div>
            </div>
        </div>
    );
}
