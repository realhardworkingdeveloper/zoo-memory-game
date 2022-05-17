import { useLocation } from "react-router-dom";
import useAccount from "../../store/account.store";
import { convertToHours } from "../../utils/date-time";
import classes from "./points-counter.module.css";

const PointsCounter = ({ page = "home" }) => {
  const { totalPoints, timeRemaining, isWalletConnected } = useAccount();

  const { pathname } = useLocation();

  if (!isWalletConnected || pathname.includes("/game")) return null;

  return (
    <div
      className={`${classes.pointsCounter} ${page === "game" && classes.game}`}
    >
      <div className={classes.points}>
        <div className={classes.imgContainer}>
          <img src="/img/point-diamond.png" alt="points" />
        </div>
        <div>
          <span>{totalPoints}</span>
        </div>
      </div>

      {totalPoints > 0 && timeRemaining > 0 && page !== "game" && (
        <div>{convertToHours(timeRemaining)}</div>
      )}
    </div>
  );
};

export default PointsCounter;
