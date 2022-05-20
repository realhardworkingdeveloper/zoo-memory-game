
import React from "react";
import partners1 from "../assets/partners1.png";
import partners2 from "../assets/partners2.png";


export default function Clients() {
    const data = [partners1, partners2];
    return (
        <div className="clients">
            <div className="container">
                <div className="clients-container">
                    {data.map((client, index) => (
                        <div className="client" key={index}>
                            <img src={client} alt="client" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}