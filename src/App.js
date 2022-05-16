import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// components and pages
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page/home-page";

// hooks
import { useTheme } from "./hooks/use-theme";
import { useInterval } from "./hooks/use-interval";

// global state
import useAccount from "./store/account.store";

// styles
import "./scss/index.scss";

// NEAR utils
import { accountBalance, initializeContract } from "./utils/near";

export const App = () => {
  const [theme, changeTheme] = useTheme();

  const {
    setAccount,
    setBalance,
    setPoints,
    timeRemaining,
    setTimeRemaining,
    accountLoading,
    setAccountLoading,
  } = useAccount();

  useEffect(() => {
    (async () => {
      try {
        await initializeContract();

        const acc = window.walletConnection.account();
        setAccount(acc);

        if (acc && acc.accountId) {
          const bal = await accountBalance();
          setBalance(bal);

          // TODO: Integrate with smart contract to get points owned by user, and remaining time for the points expiry
          const accountDetails = JSON.parse(
            localStorage.getItem(acc.accountId)
          );
          const totalPoints = accountDetails?.points || 0;
          // TODO: adding arbitrary time here, not storing for now, replace with API call values
          const timeRemaining = totalPoints > 0 ? 16 * 60 * 60 : 0;

          setPoints(totalPoints);
          setTimeRemaining(timeRemaining);
        }

        setAccountLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []); /* eslint-disable-line */ /* fucking BS eslint error */

  useInterval(() => {
    if (accountLoading) {
      return;
    }

    setTimeRemaining(timeRemaining - 1);
  }, 1000);

  if (accountLoading) return;

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar changeTheme={changeTheme} currentTheme={theme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<></>} />
        <Route path="/marketplace" element={<></>} />
      </Routes>
    </div>
  );
};

export default App;
