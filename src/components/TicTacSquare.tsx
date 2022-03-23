import React from "react";
import { PlayersScore } from "./Board";

interface SquareName {
  name: number | string;
  currentGameState: (number | string)[];
  setCurrentGameState: (value: (number | string)[]) => void;
  index: number;
  score: PlayersScore;
  setScore: (value: PlayersScore) => void;
}

function TicTacSquare({
  name,
  currentGameState,
  setCurrentGameState,
  index,
  score,
  setScore,
}: SquareName) {
  const handleChangeGameState = () => {
    if (score.playerTurn === true) {
      const currentGameStateArray = currentGameState.map((item, key) => {
        if (index !== key) {
          return item;
        } else {
          return score.playerSide;
        }
      });

      setCurrentGameState(currentGameStateArray);
      setScore({ ...score, playerTurn: false });
    }
  };

  return (
    <div
      className="square"
      onClick={typeof name === "string" ? undefined : handleChangeGameState}
    >
      <span className="square__number">{typeof name === "string" && name}</span>
    </div>
  );
}

export default TicTacSquare;
