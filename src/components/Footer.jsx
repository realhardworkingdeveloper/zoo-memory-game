import React from "react";
import logo from "../assets/logo.png";
import {  BsTwitter, BsInstagram } from "react-icons/bs";
import { FaTelegramPlane, FaDiscord } from "react-icons/fa";
export default function Footer() {
    const links = [
        {
            title: "About",
            data: ["About", "Terms", "Legal"],
        },
        {
            title: "NFT",
            data: ["Marketplace", "NEAR", "Paras"],
        },
        {
            title: "Contact",
            data: ["Press", "Support"],
        },
        {
            title: "Social",
            data: ["Twiiter", "Instagram"],
        },
    ];
    const socialLink = [
        <FaTelegramPlane />,
        <FaDiscord />,
        <BsTwitter />,
        <BsInstagram />,

    ];
    return (
        <footer>
            <div className="upper">
                <div className="brand-container">
                    <div className="brand">
                        <img src={logo} alt="logo" />
                    </div>
                    <p>Exclusive NFT Collection</p>
                    <ul>
                        {socialLink.map((link, index) => (
                            <li key={index}>{link}</li>
                        ))}
                    </ul>
                </div>
                <div className="links">
                    {links.map(({ title, data }, index) => {
                        return (
                            <div className="link" key={index}>
                                <h4>{title}</h4>
                                <ul>
                                    {data.map((link, index2) => (
                                        <li key={index2}>{link}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="lower">
                <span>&copy; Copyright 2022 ZooKeepers</span>
                <span>NEAR UA Hackathon 2022</span>
            </div>
        </footer>
    );
}
