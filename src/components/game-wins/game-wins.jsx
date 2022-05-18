import classes from "./game-wins.module.css";

const GameWins = ({ numberOfWins = 0 }) => {
  return (
    <div className={classes.numWins}>
      {/* <span className={numberOfWins >= 1 && classes.win}>1</span>
      <span className={numberOfWins >= 2 && classes.win}>2</span>
      <span className={numberOfWins >= 3 && classes.win}>3</span> */}

      <span className={numberOfWins >=1 ? classes.win : ""}>1</span>
      <span className={numberOfWins >=2 ? classes.win : ""}>2</span>
      <span className={numberOfWins >=3 ? classes.win : ""}>3</span>
    </div>
  );
};

export default GameWins;
