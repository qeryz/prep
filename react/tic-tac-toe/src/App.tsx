import "./App.css";
import { Board } from "./components/Board";
import { useState } from "react";

function App() {
  const [size, setSize] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>(""); // State to hold the temporary input value
  const MIN_SIZE = 2;
  const MAX_SIZE = 10;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const numberValue = Number(value);

    // 1. Check if the value is a valid number (not NaN)
    // 2. Check if the number is an integer
    // 3. Check if the number is within the MIN and MAX range
    if (
      !isNaN(numberValue) &&
      Number.isInteger(numberValue) &&
      numberValue >= MIN_SIZE &&
      numberValue <= MAX_SIZE
    ) {
      setSize(numberValue); // Only set the actual size if validation passes
    } else {
      setSize(null); // Reset size if validation fails or input is empty/invalid
    }
  };

  if (!size) {
    return (
      <div className="app">
        <div className="size-input-container">
          <h1 className="title">Tic-Tac-Toe</h1>
          <input
            className="size-input"
            type="number"
            placeholder={`Enter board size (${MIN_SIZE}-${MAX_SIZE})`}
            value={inputValue}
            onChange={handleInputChange}
            min={MIN_SIZE}
            max={MAX_SIZE}
          />
          <p className="input-info">Enter a size</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Board size={size} />
    </div>
  );
}

export default App;
