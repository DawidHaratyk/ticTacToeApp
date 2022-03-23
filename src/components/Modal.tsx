import React from "react";
import { Sides } from "../App";

interface PlayersSides {
  sides?: Sides;
  setSides?: (value: Sides) => void;
}

function Modal({ sides, setSides }: PlayersSides) {
  return (
    <div
      className={`modal-container ${sides!.player && "modal-container__none"}`}
    >
      <div className="modal">
        <span className="modal__text">select side</span>
        <div className="modal__buttons-container">
          <button
            className="modal__button"
            onClick={() => setSides!({ player: "x", computer: "o" })}
          >
            <span className="modal__button-span">x</span>
          </button>
          <button
            className="modal__button"
            onClick={() => setSides!({ player: "o", computer: "x" })}
          >
            <span className="modal__button-span">o</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
