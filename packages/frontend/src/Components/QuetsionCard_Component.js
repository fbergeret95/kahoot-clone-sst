import React, { useState } from "react";
import { API } from "aws-amplify";

const apiName = "KahootCloneAPI";
const path = "/questions";
const myInit = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: "param", // OPTIONAL
  },
};

API.get(apiName, path, myInit)
  .then((response) => {
    console.log(
      "🚀 ~ file: QuetsionCard_Component.js:16 ~ .then ~ response:",
      response
    );
    // Add your code here
  })
  .catch((error) => {
    console.log(error.response);
  });

export default function QuestionCardComponent() {
  const fetchDataFromGetQuestions = [
    {
      amount: 2,
      questions: [
        {
          id: 1,
          text: "pregunta 1",
          options: [
            {
              id: 1,
              text: "respuesta incorrecta a pregunta 1",
            },
            {
              id: 2,
              text: "respuesta correcta a pregunta 1",
            },
          ],
        },
        {
          id: 2,
          text: "pregunta 2",
          options: [
            {
              id: 3,
              text: "respuesta incorrecta a pregunta 2",
            },
            {
              id: 4,
              text: "respuesta correcta a pregunta 2",
            },
          ],
        },
        {
          id: 3,
          text: "pregunta 3",
          options: [
            {
              id: 5,
              text: "respuesta incorrecta a pregunta 3",
            },
            {
              id: 6,
              text: "respuesta correcta a pregunta 3",
            },
          ],
        },
        {
          id: 4,
          text: "pregunta 4",
          options: [
            {
              id: 7,
              text: "respuesta incorrecta a pregunta 4",
            },
            {
              id: 8,
              text: "respuesta correcta a pregunta 4",
            },
          ],
        },
      ],
    },
  ];

  const [questionsData, setQuestionsData] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestionSet = fetchDataFromGetQuestions[0].questions;
  const currentQuestion = currentQuestionSet[currentQuestionIndex];

  const handleAnswerClick = () => {
    if (currentQuestionIndex < currentQuestionSet.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const pageStyles = {
    fontFamily: "Arial",
  };

  const titleStyles = {
    textAlign: "center",
    paddingTop: "5%",
    fontFamily: "Arial",
  };
  const cardStyles = {
    textAlign: "center",
    paddingTop: "1%",
    paddingBottom: "2%",
    backgroundColor: "#C0392B",
    marginLeft: "25%",
    marginRight: "25%",
    borderRadius: "8px",
  };

  const customStyleBtn = {
    padding: "8px 16px",
    borderRadius: "9999px",
    backgroundColor: "#EC7063",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonStyles = {
    backgroundColor: "white",
  };
  return (
    <div style={pageStyles}>
      <div style={titleStyles}>
        <h2>Perficient Quiz zone</h2>
      </div>
      <div style={cardStyles}>
        <h4>{currentQuestion.text}</h4>
        <div>
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className="answer-button"
              onClick={handleAnswerClick}
              style={customStyleBtn}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
