import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function MatchResultDialog({ isOpen, setIsOpen, result }) {
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick" && "escapeKeyDown") return;
    setIsOpen(false);
  };
  const endGame = () => {
    setIsOpen(false);
    window.close();
  };
  const playAgain = () => {
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Result"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {result}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={endGame}>End Game</Button>
          <Button onClick={playAgain} autoFocus>
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
