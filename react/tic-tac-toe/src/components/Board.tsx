import { useMemo, useState } from "react";

type Mark = "X" | "O";
type BoardCell = Mark | null;

type BoardData = BoardCell[][];

function initializeBoard(size: number): BoardData {
  const boardArr: BoardData = [];
  for (let i = 0; i < size; i++) {
    const arr: BoardCell[] = [];
    for (let j = 0; j < size; j++) {
      arr.push(null);
    }
    boardArr.push(arr);
  }
  return boardArr;
}

function determineWinner(
  board: BoardData,
  size: number,
  row: number,
  col: number,
  mark: Mark
): boolean {
  let rowCount = 0;
  let colCount = 0;

  // Loop through rows and cols to check for win
  for (let i = 0; i < size; i++) {
    // Count the marks for row of user's move
    if (board[row][i] === mark) {
      rowCount++;
    }
    // Count the marks for col of user's move
    if (board[i][col] === mark) {
      colCount++;
    }
  }
  if (rowCount === size || colCount === size) {
    return true;
  }

  // Check Main Diagonal (Top-Left to Bottom-Right): r == c
  if (row === col) {
    let mainDiagCount = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][i] === mark) {
        mainDiagCount++;
      }
    }
    if (mainDiagCount === size) {
      return true;
    }
  }

  // Check Anti-Diagonal (Top-Right to Bottom-Left): r + c == N - 1
  if (row + col === size - 1) {
    let antiDiagCount = 0;

    for (let i = 0; i < size; i++) {
      if (board[i][size - 1 - i] === mark) {
        antiDiagCount++;
      }
    }

    if (antiDiagCount === size) {
      return true;
    }
  }

  return false;
}

export const Board = ({ size }: { size: number }) => {
  const [board, setBoard] = useState<BoardData>(initializeBoard(size));
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const [winner, setWinner] = useState<Mark | null>(null);
  const currentPlayer = xIsPlaying ? "X" : "O";

  const isDraw = useMemo(() => {
    return !winner && board.flat().every((cell) => cell !== null);
  }, [board, winner]);

  const reset = (): void => {
    setBoard(initializeBoard(size));
    setXIsPlaying(true);
    setWinner(null);
  };

  const statusMessage = useMemo(() => {
    if (winner) {
      return `🎉 Winner: ${winner}!`;
    }
    if (isDraw) {
      return `🤝 It's a Draw!`;
    }
    return `Current Player: ${currentPlayer}`;
  }, [winner, isDraw, currentPlayer]);

  return (
    <div>
      <div>
        <p>{statusMessage}</p>
      </div>
      <div
        className="grid-container"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              disabled={cell !== null || !!winner}
              onClick={() => {
                const newBoard = board.map((row) => [...row]);
                newBoard[r][c] = currentPlayer;
                setBoard(newBoard);
                if (determineWinner(newBoard, size, r, c, currentPlayer)) {
                  setWinner(currentPlayer);
                }
                setXIsPlaying((prev) => !prev);
              }}
              key={`cell-${r}-${c}`}
              className="cell"
            >
              {cell}
            </button>
          ))
        )}

        {(winner || isDraw) && (
          <div className="flex justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-lg rounded-full shadow-xl transition-transform duration-150 transform hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
