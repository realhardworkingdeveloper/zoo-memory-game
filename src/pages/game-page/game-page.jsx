import { useEffect, useState } from "react";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import GameCard from "../../components/game-card/game-card";
import classes from "./game-page.module.css";
import useAccount from "../../store/account.store";

import { v4 } from "uuid";
import Big from "big.js";
import {
  getPointsForLevel,
  getTimeForLevel,
  shuffleArray,
} from "../../utils/game-rules";
import useUpdateEffect from "../../hooks/use-update-effect";
import { Navigate } from "react-router-dom";
import useInterval from "../../hooks/use-interval";

// import PointsCounter from "../points-counter/points-counter";
// import Logout from "../logout/logout";
import GameWins from "../../components/game-wins/game-wins";
import GamePointsCounter from "../../components/game-points/game-points";
import { getWorldTime } from "../../utils/date-time";

const GamePage = () => {
  const TOTAL_LEVELS = 10;
  const CUTOFF_LEVEL = 5;
  const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

  const {
    totalPoints,
    tempPoints,
    addTempPoints,
    setTimeRemaining: setRemainingPointsTime,
  } = useAccount();

  // import the list of cards from public dir
  const cardImages = Array(18)
    .fill(0)
    .map((_, idx) => ({
      src: `/img/new-animals/${idx + 1}.png`,
      matched: false,
    }));

  const [pageLoading, setPageLoading] = useState(true);

  const [curLevel, setCurLevel] = useState(0);
  const [numberOfWins, setNumberOfWins] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [lastWonTimestamp, setLastWonTimestamp] = useState();
  const [userHasWon, setUserHasWon] = useState(false);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isNextLeveling, setIsNextLeveling] = useState(false);

  // get account details
  const { accountId, isWalletConnected } = useAccount();

  //shuffle cards
  const shuffleCards = (lvl = 0) => {
    // const shuffledCards = [...cardImages, ...cardImages]
    //   .sort(() => Math.random() - 0.5)
    //   .map((card) => ({ ...card, id: v4() })); // use uuid for unique key

    const animalList = shuffleArray(cardImages).slice(
      0,
      lvl >= CUTOFF_LEVEL ? 10 : 6
    );

    const shuffledCards = shuffleArray([...animalList, ...animalList]).map(
      (card) => ({ ...card, id: v4() })
    ); // use uuid for unique key

    setCards(shuffledCards);
  };

  // initial mount, fetch data from smart contact (temporarily localStorage)
  useEffect(() => {
    (async () => {
      // TODO: perform async actions with smart contracts to get the level, number of times won, etc, will get them from localStorage for now
      const curData = await window.contract.get_status({
        account_id: accountId
      });
      console.log("curData", curData)

      const currentTime = await getWorldTime();

      const lastWonTimestamp = curData?.last_updated_at ? curData?.last_updated_at : currentTime;
      setLastWonTimestamp(lastWonTimestamp);

      // const curData = localStorage.getItem(accountId)
      //   ? JSON.parse(localStorage.getItem(accountId))
      //   : null;

      // check if 24 hours have passed since user last won
      const has24HoursPassedSincelastWin =
        currentTime - lastWonTimestamp >= 24 * 60 * 60;

      // check whether to reset level or not based on when user last played/won
      const levelToSet = has24HoursPassedSincelastWin ? 0 : curData?.level || 0;

      setCurLevel(levelToSet);
      setNumberOfWins(0);
      setRemainingTime(getTimeForLevel(levelToSet)); // TODO: smart contract API to get time for level
      shuffleCards(levelToSet);

      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(0);

      setPageLoading(false);
    })();
  }, []); /* eslint-disable-line */

  // check for changes in cards to see if user has won the game
  useUpdateEffect(() => {
    // check if all cards are matched, to count it as a win
    const hasWonGame = cards.length > 0 && !cards.some((card) => !card.matched);

    if (hasWonGame) {
      // TODO: perform actions here to update wins and award points or whatever

      setUserHasWon(true);
      setDisabled(true);
      setNumberOfWins((numWins) => numWins + 1);
    }
  }, [cards, curLevel]);

  // store data in localStorage (after initial renders are done)
  useUpdateEffect(() => {
    if (!accountId) return;

    localStorage.setItem(
      accountId,
      JSON.stringify({
        level: curLevel,
        points: totalPoints,
        tempPoints,
        permPoints: 0,
      })
    );
  }, [accountId, curLevel, totalPoints, tempPoints]);

  // compare 2 selected cards
  useUpdateEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // check if user has won level and award points accordingly
  useUpdateEffect(() => {
    (async () => {
      if (numberOfWins >= 3) {
        const currentTime = await getWorldTime();
        if (currentTime - lastWonTimestamp >= 24 * 60 * 60) {
          alert(
            "Sorry, it's been 24 hours since you last passed a level, we are resetting your level to 0"
          );
          setCurLevel(0);
          setNumberOfWins(0);
          shuffleCards(0);
          setChoiceOne(null);
          setChoiceTwo(null);
          setRemainingTime(getTimeForLevel(0));
          setTurns(0);
          setUserHasWon(false);
          setDisabled(false);
        }

        if (tempPoints === 0) setRemainingPointsTime(24 * 60 * 60); // TODO: store current time as start time for points expiry
        // TODO: store timestamp here for user passing a level
        // localStorage.setItem("lastWonTimestamp", JSON.stringify(Date.now()));
        setLastWonTimestamp(currentTime);

        // const updatedData = await window.contract.set_status({}, BOATLOAD_OF_GAS);
        // console.log("=======updatedData=======", updatedData)
        // localStorage.setItem(
        //   accountId,
        //   JSON.stringify({
        //     level: curLevel + 1,
        //     points: totalPoints,
        //     tempPoints,
        //     permPoints: 0,
        //   })
        // );
        // addTempPoints(getPointsForLevel(curLevel)); // TODO: smart contract logic for points for level
      }
    })()
  }, [numberOfWins, curLevel, addTempPoints]);

  // timer
  useInterval(() => {
    if (pageLoading) return;

    if (remainingTime <= 0 || userHasWon) {
      setDisabled(true);
    }
    if (remainingTime <= 0 && !userHasWon) {
      setNumberOfWins(0);
    }

    if (remainingTime > 0 && !userHasWon) setRemainingTime(remainingTime - 1);
  }, 1000); // delay in ms, 1s => 1000ms

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const replayHandler = async () => {
    if (userHasWon && numberOfWins >= 3) {
      // await window.contract.set_status({}, BOATLOAD_OF_GAS);
      // TODO: perform actions here to update points for user
      setIsNextLeveling(true);
      console.log("==========updating=============")
      await window.contract.set_status({}, BOATLOAD_OF_GAS);
      console.log("==========updated=============")
      addTempPoints(getPointsForLevel(curLevel));

      const newLevel = curLevel >= TOTAL_LEVELS ? TOTAL_LEVELS : curLevel + 1;
      setCurLevel(newLevel);
      setNumberOfWins(0);
      setRemainingTime(getTimeForLevel(newLevel));
      shuffleCards(newLevel);

      setIsNextLeveling(false);
    } else {
      setRemainingTime(getTimeForLevel(curLevel));
      shuffleCards(curLevel);
    }

    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setUserHasWon(false);
    setDisabled(false);
  };

  // if user has not connected wallet, redirect to home page
  if (!isWalletConnected) return <Navigate to="/" />;
  // while still fetching user and game details from smart contracts, show loader or something
  if (pageLoading) return;

  return (
    <BlockUi tag="div" blocking={isNextLeveling}>
      <div className="game-page">
        <div className="game-stats">
          <div className="points">
            <GamePointsCounter />
          </div>
          <div className="levels">
            <h2>Level {curLevel} of {TOTAL_LEVELS}</h2>

            <p>
              <span style={{ fontSize: "1.5rem" }}>{remainingTime}</span>
              <span>s</span>
            </p>

          </div>
          <div className="wins">
            <GameWins numberOfWins={numberOfWins} />
          </div>
        </div>
        <div className="game-body">
          <div
            className={`${classes.cardGrid} ${curLevel >= CUTOFF_LEVEL ? classes.row5 : ""
              }`}
          >
            {cards.map((card) => {
              const isCardFlipped =
                card?.id === choiceOne?.id ||
                card?.id === choiceTwo?.id ||
                card?.matched;

              return (
                <GameCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={isCardFlipped}
                  disabled={disabled || isCardFlipped}
                />
              );
            })}
          </div>
          <div className="turns">
            {userHasWon || remainingTime <= 0 ? (
              <button onClick={replayHandler} className="btn">
                {userHasWon
                  ? numberOfWins >= 3
                    ? "Next Level"
                    : "Re-play"
                  : "Try Again"}
              </button>
            ) : (
              <p style={{ "color": "var(--accent-color3)" }}>Turns: {turns}</p>
            )}
          </div>
        </div>
      </div>
    </BlockUi>
    // <div className="gameBody">
    //   <h2>
    //     Level {curLevel} of {TOTAL_LEVELS}
    //   </h2>
    //   <p>
    //     <span style={{ fontSize: "2rem" }}>{remainingTime}</span>
    //     <span>s</span>
    //   </p>

    //   {/* <GameWins numberOfWins={numberOfWins} />
    //   <GamePointsCounter /> */}
    //   <div className="game">
    //     <GamePointsCounter />

    // <div
    //   className={`${classes.cardGrid} ${
    //     curLevel >= CUTOFF_LEVEL ? classes.row5 : ""
    //   }`}
    // >
    //   {cards.map((card) => {
    //     const isCardFlipped =
    //       card?.id === choiceOne?.id ||
    //       card?.id === choiceTwo?.id ||
    //       card?.matched;

    //     return (
    //       <GameCard
    //         key={card.id}
    //         card={card}
    //         handleChoice={handleChoice}
    //         flipped={isCardFlipped}
    //         disabled={disabled || isCardFlipped}
    //       />
    //     );
    //   })}
    // </div>

    //     <GameWins numberOfWins={numberOfWins} />
    //   </div>

    //   {userHasWon || remainingTime <= 0 ? (
    //     <button onClick={replayHandler}>
    //       {userHasWon
    //         ? numberOfWins >= 3
    //           ? "Next Level"
    //           : "Replay"
    //         : "Try Again"}
    //     </button>
    //   ) : (
    //     <p>Turns: {turns}</p>
    //   )}
    // </div>
  );
};

export default GamePage;
