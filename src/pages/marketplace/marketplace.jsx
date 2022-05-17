import { NavLink, Route, Routes } from "react-router-dom";

const Marketplace = () => {
  const ComingSoon = <h1 style={{ textAlign: "center" }}>Coming soon</h1>;
  const cls = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="marketplace">
      <div className="marketplace__nav">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="buy"
        >
          BUY
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="sell"
        >
          SELL
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="collection"
        >
          COLLECTION
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="stake"
        >
          STAKE
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="swap"
        >
          SWAP
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="mint"
        >
          MINT
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="created"
        >
          CREATED
        </NavLink>
      </div>

      <div className="marketplace__content">
        <Routes>
          <Route path="buy" element={ComingSoon} />
          <Route path="sell" element={ComingSoon} />
          <Route path="collection" element={ComingSoon} />
          <Route path="stake" element={ComingSoon} />
          <Route path="swap" element={ComingSoon} />
          <Route path="mint" element={ComingSoon} />
          <Route path="created" element={ComingSoon} />
        </Routes>
      </div>
    </div>
  );
};

export default Marketplace;
