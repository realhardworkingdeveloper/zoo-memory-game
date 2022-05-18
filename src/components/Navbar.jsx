import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdLogout } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import { login, logout } from "../utils/near";
import logo from "../assets/logo.png";
import useAccount from "../store/account.store";
import { Link } from "react-router-dom";
import PointsCounter from "./points-counter/points-counter";

export default function Navbar({ changeTheme, currentTheme }) {
  const [navState, setNavState] = useState(false);

  const { isWalletConnected, accountId } = useAccount();

  const loginLogout = () => {
    if (isWalletConnected) logout();
    else login();
  };

  const checkAuthBeforeHref = () => {
    if (!isWalletConnected) {
      login();
      return false;
    }
  };
  const accountInfo = () => {
    window.open(`https://explorer.testnet.near.org/accounts/${accountId}`, "_blank");
  };

  return (
    <nav>
      <div className="brand-container">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>
        <div className="toggle-container">
          <div className="toggle">
            {navState ? (
              <MdClose onClick={() => setNavState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavState(true)} />
            )}
          </div>
          <div className="mode" onClick={changeTheme}>
            {currentTheme === "dark" ? (
              <ImSun className="light" />
            ) : (
              <BsFillMoonFill className="dark" />
            )}
          </div>
        </div>
      </div>
      <div className={`links-container ${navState ? "nav-visible" : ""}`}>
        <ul className="links">
          <li>
            <Link
              to={!isWalletConnected ? "#" : "/game"}
              onClick={checkAuthBeforeHref}
            >
              Play Game
            </Link>
          </li>
          <li>
            <Link
              to={!isWalletConnected ? "" : "/marketplace"}
              onClick={checkAuthBeforeHref}
            >
              Marketplace
            </Link>
          </li>
          <li>
            <a href="#launch">How to Play</a>
          </li>
          <li>
            <a href="#newsletter">Newsletter</a>
          </li>
          <li>
            <div className="accountInfo">
              {isWalletConnected ? (
                <div className="walletDiv">
                <button className="wallet" onClick={accountInfo}>{accountId}</button>
                <MdLogout size={20} onClick={loginLogout}/>
                </div>
              ) : (
                <button className="wallet" onClick={loginLogout}>Connect Near</button>
              )}
            </div>
            {/* <button onClick={loginLogout} className="wallet">
              {isWalletConnected ? (
                <span>
                  <span>{accountId} </span>
                  <span
                    style={{ color: currentTheme === "dark" ? "#fff" : "#000" }}
                  >
                    {"(>"}
                  </span>
                </span>
              ) : (
                "Connect Near"
              )}
            </button> */}
          </li>
          <li onClick={changeTheme} style={{ cursor: "pointer" }}>
            {currentTheme === "dark" ? (
              <ImSun size={20} className="light" />
            ) : (
              <BsFillMoonFill size={20} className="dark" />
            )}
          </li>
        </ul>
      </div>

      <PointsCounter />
    </nav>
  );
}
