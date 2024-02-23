import React, { useState, useEffect } from 'react';
import Quizcard from "./Quizcard";

function Quiz() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "language": "cpp",
        "difficulty": "begineer",
        "topic": "string",
        "numQuestions": 5
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      try {
        const response = await fetch("http://localhost:3001/", requestOptions);
        const data = await response.json();
        if (data && data.jsonQuestions && data.jsonQuestions.questions) {
          setQuestions(data.jsonQuestions.questions);
        } else {
          console.error('Invalid API response:', data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selectedOption) => {
    // Handle the answer submission here
    console.log('Selected option:', selectedOption);
    // You can perform any logic related to answer submission here
  };

  return (
    <div>
      {questions.map((question, index) => (
        <Quizcard
          key={index}
          question={question.query}
          choices1={question.choices[0]}
            choices2={question.choices[1]}
            choices3={question.choices[2]}
            choices4={question.choices[3]}

          correct={question.answer}
          onAnswer={handleAnswer}
        />
      ))}
    </div>
  );
}

export default Quiz;
