import useAccount from "../../store/account.store";
import classes from "./game-points.module.css";

const GamePointsCounter = ({ page = "home" }) => {
  const { totalPoints, permanentPoints } = useAccount();

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

      <div className={classes.points}>
        <div className={classes.imgContainer}>
          <img src="/img/point-diamond.png" alt="points" />
        </div>
        <div>
          <span>{permanentPoints}</span>
        </div>
      </div>
    </div>
  );
};

export default GamePointsCounter;
