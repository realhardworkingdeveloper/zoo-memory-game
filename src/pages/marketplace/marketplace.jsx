import { memo } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import BuyPage from "../buy-page/buy-page";
import CreatePage from "../created-page/created-page";
import MintPage from "../mint-page/mint-page";

const Marketplace = () => {
  const ComingSoon = <h1 style={{ textAlign: "center" }}>Coming soon</h1>;
  const cls = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="marketplace">
      <div className="marketplace__nav">
        <NavLink className={cls} to="buy">
          BUY
        </NavLink>
        <NavLink className={cls} to="sell">
          SELL
        </NavLink>
        <NavLink className={cls} to="collection">
          COLLECTION
        </NavLink>
        <NavLink className={cls} to="stake">
          STAKE
        </NavLink>
        <NavLink className={cls} to="swap">
          SWAP
        </NavLink>
        <NavLink className={cls} to="mint">
          MINT
        </NavLink>
        <NavLink className={cls} to="created">
          CREATED
        </NavLink>
      </div>

      <div className="marketplace__content">
        <Routes>
          <Route path="buy" element={<BuyPage />} />
          <Route path="sell" element={ComingSoon} />
          <Route path="collection" element={ComingSoon} />
          <Route path="stake" element={ComingSoon} />
          <Route path="swap" element={ComingSoon} />
          <Route path="mint" element={<MintPage />} />
          <Route path="created" element={<CreatePage />} />
          <Route path="*" element={<Navigate to="buy" />} />
        </Routes>
      </div>
    </div>
  );
};

export default memo(Marketplace);
