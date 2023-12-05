import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      // Decrease timeRemaining by 1 every 1 second
      setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup function to clear the timeout when component unmounts or when the next question is shown
    return () => clearTimeout(timerId);
  }, [timeRemaining]); // Run effect whenever timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  // Reset timeRemaining and call onAnswered when timeRemaining hits 0
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
