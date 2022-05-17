import classes from "./game-card.module.css";

export const GameCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={classes.card} key={card.id}>
      <div className={flipped ? classes.flipped : ""}>
        <img className={classes.front} src={card.src} alt="cardfront" />
        <img
          className={classes.back}
          // src="/img/cover.png"
          src="/img/new-animals/new-cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default GameCard;
