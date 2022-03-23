import React, { useState } from "react";
import Board from "./components/Board";
import Modal from "./components/Modal";

export interface Sides {
  player: string;
  computer: string;
}

function App() {
  const [sides, setSides] = useState<Sides>({
    player: "",
    computer: "",
  });

  return (
    <div className="tic-tac-toe-app">
      <Modal sides={sides} setSides={setSides} />
      <div className="game-container">
        <h1 className="game-container__headline">tic tac toe</h1>
        <Board sides={sides} />
      </div>
    </div>
  );
}

export default App;
