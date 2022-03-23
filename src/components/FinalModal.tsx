import React, { useEffect } from "react";

interface FinalModalState {
  winner: string;
  isFinalModalVisible: boolean;
  setIsFinalModalVisible: (value: boolean) => void;
  setWinner: (value: string) => void;
}

function FinalModal({
  winner,
  isFinalModalVisible,
  setIsFinalModalVisible,
  setWinner,
}: FinalModalState) {
  useEffect(() => {
    setTimeout(() => {
      setWinner("");
    }, 2000);
  }, [setIsFinalModalVisible, setWinner]);

  return (
    <div
      className={`modal-container ${
        !isFinalModalVisible && "modal-container__none"
      }`}
    >
      <div className="modal modal__final">
        <span className="modal__text">{`${
          winner === "draw" ? "draw" : `winner: ${winner}`
        }`}</span>
      </div>
    </div>
  );
}

export default FinalModal;
