import React, { useCallback, useEffect, useState } from "react";
import Score from "./Score";
import TicTacBoard from "./TicTacBoard";
import { Sides } from "../App";
import FinalModal from "./FinalModal";

export interface PlayersScore {
  playerScore: number;
  playerSide: string;
  computerScore: number;
  computerSide: string;
  playerTurn: boolean;
}

interface PlayersSides {
  sides: Sides;
}

const gameState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winningSolutions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board({ sides }: PlayersSides) {
  const [score, setScore] = useState<PlayersScore>({
    playerScore: 0,
    playerSide: sides.player,
    computerScore: 0,
    computerSide: sides.computer,
    playerTurn: true,
  });
  const [currentGameState, setCurrentGameState] =
    useState<(number | string)[]>(gameState);
  const [winner, setWinner] = useState<string>("");
  const [isFinalModalVisible, setIsFinalModalVisible] = useState(true);

  const handleCheckIfSomeoneWin = useCallback(() => {
    const { playerTurn, playerSide, computerSide, playerScore, computerScore } =
      score;
    const currentPlayerSide = playerTurn ? computerSide : playerSide;

    const checkIfItIsDraw = currentGameState.every(
      (item) => typeof item === "string"
    );

    if (checkIfItIsDraw) {
      setWinner("draw");
      setScore({
        ...score,
        playerTurn: true,
      });
      setCurrentGameState(gameState);
    }

    for (let i = 0; i < winningSolutions.length; i++) {
      const winningCondition =
        currentGameState[winningSolutions[i][0]] === currentPlayerSide &&
        currentGameState[winningSolutions[i][1]] === currentPlayerSide &&
        currentGameState[winningSolutions[i][2]] === currentPlayerSide;

      if (winningCondition) {
        setWinner(currentPlayerSide);
        setScore({
          ...score,
          playerScore: playerTurn ? playerScore : playerScore + 1,
          computerScore: playerTurn ? computerScore + 1 : computerScore,
          playerTurn: true,
        });
        setCurrentGameState(gameState);
      }
    }
  }, [currentGameState, score]);

  useEffect(() => {
    const { player, computer } = sides;
    setScore({ ...score, playerSide: player, computerSide: computer });
  }, [sides]);

  useEffect(() => {
    handleCheckIfSomeoneWin();
  }, [score.playerTurn, handleCheckIfSomeoneWin]);

  return (
    <div className="board">
      {winner && (
        <FinalModal
          winner={winner}
          isFinalModalVisible={isFinalModalVisible}
          setIsFinalModalVisible={setIsFinalModalVisible}
          setWinner={setWinner}
        />
      )}
      <div className="board__scores">
        <Score player={"player"} score={score} />
        <Score player={"computer"} score={score} />
      </div>
      <TicTacBoard
        currentGameState={currentGameState}
        setCurrentGameState={setCurrentGameState}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}

export default Board;
