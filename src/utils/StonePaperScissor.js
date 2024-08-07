import React, { useState } from "react";

const choices = ["stone", "paper", "scissors"];

export const StonePaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    setUserChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    setResult(getResult(choice, randomChoice));
  };

  const getResult = (user, computer) => {
    if (user === computer) {
      return "It's a tie!";
    }
    if (
      (user === "stone" && computer === "scissors") ||
      (user === "paper" && computer === "stone") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "You win!";
    }
    return "You lose!";
  };

  return (
    <div className="game">
      <h1>Stone Paper Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {userChoice && computerChoice && (
        <div className="result">
          <p>You chose: {userChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
};
