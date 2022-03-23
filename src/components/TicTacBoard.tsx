import React, { useEffect } from "react";
import TicTacSquare from "./TicTacSquare";
import { PlayersScore } from "./Board";

interface GameState {
  currentGameState: (number | string)[];
  setCurrentGameState: (value: (number | string)[]) => void;
  score: PlayersScore;
  setScore: (value: PlayersScore) => void;
}

function TicTacBoard({
  currentGameState,
  setCurrentGameState,
  score,
  setScore,
}: GameState) {
  const handleAiTurn = () => {
    const activeFields = currentGameState.filter(
      (item) => typeof item === "number"
    );

    const randomIndex = Math.floor(Math.random() * activeFields.length);

    const gameState = currentGameState.map((item) => {
      if (item === activeFields[randomIndex]) return score.computerSide;
      else return item;
    });

    setCurrentGameState(gameState);
    setScore({ ...score, playerTurn: true });
  };

  useEffect(() => {
    if (score.playerTurn === false) {
      const timer = setTimeout(() => {
        handleAiTurn();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentGameState, score.playerTurn]);

  const squaresList = currentGameState.map((item, index) => (
    <TicTacSquare
      name={item}
      currentGameState={currentGameState}
      setCurrentGameState={setCurrentGameState}
      index={index}
      score={score}
      setScore={setScore}
      key={index}
    />
  ));

  return <div className="tic-tac-board">{squaresList}</div>;
}

export default TicTacBoard;
