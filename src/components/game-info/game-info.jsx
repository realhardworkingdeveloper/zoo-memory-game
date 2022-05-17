import { Link } from "react-router-dom";
import classes from "./game-info.module.css";

const GameInfo = ({
  remainingTime,
  numberOfWins,
  curLevel,
  totalLevels,
  points,
}) => {
  return (
    <>
      <h1>
        Level {curLevel} of {totalLevels}
      </h1>
      <div className={classes.info}>
        {/* <Link to="/">{"<"} Back</Link> */}

        {/* <span>{remainingTime}</span> */}

        <div>
          <div className={classes.numWins}>
            <span className={numberOfWins >= 1 && classes.win}>1</span>
            <span className={numberOfWins >= 2 && classes.win}>2</span>
            <span className={numberOfWins >= 3 && classes.win}>3</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameInfo;
