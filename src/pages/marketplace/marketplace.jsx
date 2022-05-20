import { memo } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import BuyPage from "../buy-page/buy-page";
import CreatePage from "../created-page/created-page";
import MintPage from "../mint-page/mint-page";
import CollectionPage from "../collection-page/collection-page";
import MyBidsPage from "../my-bids-page/my-bids-page";

const Marketplace = () => {
  const ComingSoon = <h1 style={{ textAlign: "center" }}>Coming soon</h1>;
  const cls = ({ isActive }) => (isActive ? "active" : "");
  const { REACT_APP_CONTRACT_NAME } = process.env;

  return (
    <div className="marketplace">
      <div className="marketplace__nav">
        <NavLink className={cls} to="buy">
          AUCTION
        </NavLink>
        {/* <NavLink className={cls} to="sell">
          SELL
        </NavLink> */}
        {REACT_APP_CONTRACT_NAME !== window.accountId && (
          <>
            <NavLink className={cls} to="collection">
              COLLECTIBLES
            </NavLink>
            <NavLink className={cls} to="stake">
              STAKE
            </NavLink>
            <NavLink className={cls} to="swap">
              SWAP
            </NavLink>
            <NavLink className={cls} to="bids">
              MY BIDS
            </NavLink>
          </>
        )}
        {REACT_APP_CONTRACT_NAME === window.accountId && (
          <>
            <NavLink className={cls} to="mint">
              MINT
            </NavLink>
            <NavLink className={cls} to="created">
              CREATED
            </NavLink>
          </>
        )}
      </div>

      <div className="marketplace__content">
        <Routes>
          <Route path="buy" element={<BuyPage />} />
          {/* <Route path="sell" element={ComingSoon} /> */}
          <Route path="collection" element={<CollectionPage />} />
          <Route path="stake" element={ComingSoon} />
          <Route path="swap" element={ComingSoon} />
          <Route path="bids" element={<MyBidsPage />} />
          <Route path="mint" element={<MintPage />} />
          <Route path="created" element={<CreatePage />} />
          <Route path="*" element={<Navigate to="buy" />} />
        </Routes>
      </div>
    </div>
  );
};

export default memo(Marketplace);
