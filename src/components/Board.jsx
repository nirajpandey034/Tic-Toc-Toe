/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "@mui/material";

import MatchResultDialog from "./MatchResultDialog";

export default function Board() {
  const [boardData, setBoardData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [isDraw, setIsDraw] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");

  const resetBoard = () => {
    window.location.reload();
  };
  const checkData = (r, c, data) => {
    let gameStatus = "";
    // row check
    for (let i = 0; i < 3; i++) {
      if (gameStatus === "") {
        if (
          data[r][0] === data[r][1] &&
          data[r][1] === data[r][2] &&
          data[r][0] !== false
        ) {
          gameStatus = data[r][0];
          return gameStatus;
        } else continue;
      } else break;
    }
    // column check
    for (let i = 0; i < 3; i++) {
      if (gameStatus === "") {
        if (
          data[0][c] === data[1][c] &&
          data[1][c] === data[2][c] &&
          data[0][c] !== false
        ) {
          gameStatus = data[0][c];
          return gameStatus;
        } else continue;
      } else break;
    }
    if (
      data[0][0] === data[1][1] &&
      data[1][1] === data[2][2] &&
      data[0][0] !== false
    ) {
      gameStatus = data[0][0];
      return gameStatus;
    }
    if (
      data[0][2] === data[1][1] &&
      data[1][1] === data[2][0] &&
      data[0][2] !== false
    ) {
      gameStatus = data[0][2];
      return gameStatus;
    }
    checkDraw(data);
    return gameStatus;
  };
  const checkDraw = (data) => {
    let is_Draw = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].includes(false)) {
        is_Draw = false;
        break;
      } else is_Draw = true;
    }
    setIsDraw(is_Draw);
  };
  const boxClickHandler = (row, column, id) => {
    if (document.getElementById(id).innerText === "") {
      setCurrentPlayer((currentPlayer) => !currentPlayer);
      document.getElementById(id).innerText = currentPlayer ? "X" : "O";

      let data = boardData;
      data[row][column] = currentPlayer ? "X" : "O";
      setBoardData(data);
      let wonPlayer = checkData(row, column, data);
      if (wonPlayer !== "") {
        setShowDialog(true);
        setDialogMsg(
          `Congratulations, ${wonPlayer} won the game. Click ok to Play Again`
        );
      }
    }
  };
  useEffect(() => {
    if (boardData.length < 3) {
      for (let i = 0; i < 3; i++) {
        let data = boardData;
        data.push([false, false, false]);
        setBoardData(data);
      }
    }
  }, []);

  useEffect(() => {
    if (isDraw) {
      setShowDialog(true);
      setDialogMsg("Match Draw");
    }
  }, [isDraw]);

  return (
    <>
      <h1 style={{ textDecoration: "underline" }}>2 Player - Tic Tac Toe</h1>
      <h2>Current Player: {currentPlayer ? "X" : "0"}</h2>
      <div
        className="board"
        style={
          currentPlayer
            ? { backgroundColor: "red" }
            : { backgroundColor: "blue" }
        }
      >
        <div className="box" onClick={() => boxClickHandler(0, 0, "1")} id="1">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(0, 1, "2")} id="2">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(0, 2, "3")} id="3">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(1, 0, "4")} id="4">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(1, 1, "5")} id="5">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(1, 2, "6")} id="6">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(2, 0, "7")} id="7">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(2, 1, "8")} id="8">
          {currentPlayer}
        </div>
        <div className="box" onClick={() => boxClickHandler(2, 2, "9")} id="9">
          {currentPlayer}
        </div>
      </div>
      <Button onClick={resetBoard} variant="contained" sx={{ mt: 5 }}>
        Reset Board
      </Button>
      <MatchResultDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        result={dialogMsg}
      />
    </>
  );
}
