import React from "react";
import { PlayersScore } from "./Board";

interface PlayerScore {
  player: string;
  score: PlayersScore;
}

function Score({ player, score }: PlayerScore) {
  const activePlayerClass =
    player === "player" && score.playerTurn && "board__score-active";
  const activeComputerClass =
    player === "computer" && !score.playerTurn && "board__score-active";
  const choosingSide = player === "player" ? "player" : "computer";
  const choosingScore =
    player === "player" ? score.playerScore : score.computerScore;

  return (
    <div className={`board__score ${activePlayerClass} ${activeComputerClass}`}>
      <p className="board__score-text">{choosingSide}</p>
      <span className="board__score-number">{choosingScore}</span>
    </div>
  );
}

export default Score;
