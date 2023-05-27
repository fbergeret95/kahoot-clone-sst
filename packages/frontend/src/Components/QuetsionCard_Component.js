import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { navigate } from "gatsby";
import { Auth } from "aws-amplify";
import logo from "../images/perficient_logo.png";

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

// export default function QuestionCardComponent() {
//   const fetchDataFromGetQuestions = [
//     {
//       amount: 2,
//       questions: [
//         {
//           id: 1,
//           text: "pregunta 1",
//           options: [
//             {
//               id: 1,
//               text: "respuesta incorrecta a pregunta 1",
//             },
//             {
//               id: 2,
//               text: "respuesta correcta a pregunta 1",
//             },
//           ],
//         },
//         {
//           id: 2,
//           text: "pregunta 2",
//           options: [
//             {
//               id: 3,
//               text: "respuesta incorrecta a pregunta 2",
//             },
//             {
//               id: 4,
//               text: "respuesta correcta a pregunta 2",
//             },
//           ],
//         },
//         {
//           id: 3,
//           text: "pregunta 3",
//           options: [
//             {
//               id: 5,
//               text: "respuesta incorrecta a pregunta 3",
//             },
//             {
//               id: 6,
//               text: "respuesta correcta a pregunta 3",
//             },
//           ],
//         },
//         {
//           id: 4,
//           text: "pregunta 4",
//           options: [
//             {
//               id: 7,
//               text: "respuesta incorrecta a pregunta 4",
//             },
//             {
//               id: 8,
//               text: "respuesta correcta a pregunta 4",
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   const getQuestions = () => {
//     let apiName = "KahootCloneAPI";
//     let path = "/questions";

//     API.get(apiName, path)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {});
//   };

//   const [questionsData, setQuestionsData] = useState(null);

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const currentQuestionSet = fetchDataFromGetQuestions[0].questions;
//   const currentQuestion = currentQuestionSet[currentQuestionIndex];

//   const handleAnswerClick = () => {
//     if (currentQuestionIndex < currentQuestionSet.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   return (
//     <div style={pageStyles}>
//       <div style={titleStyles}>
//         <h2>Perficient Quiz zone</h2>
//       </div>
//       <div style={cardStyles}>
//         <h4>{currentQuestion.text}</h4>
//         <div>
//           {currentQuestion.options.map((option) => (
//             <button
//               key={option.id}
//               className="answer-button"
//               onClick={handleAnswerClick}
//               style={customStyleBtn}
//             >
//               {option.text}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

class Questions_Component extends React.Component {
  state = {
    questions: [],
  };
  updateQuestions = (questions) => {
    this.setState({ questions });
  };

  getUserAuthenticated = () => {
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

    const getQuestions = () => {
      let apiName = "KahootCloneAPI";
      let path = "/questions";

      API.get(apiName, path)
        .then((response) => {
          this.updateQuestions();
        })
        .catch((error) => {});
    };

    Auth.currentAuthenticatedUser()
      .then((result) => {
        // this.setState({errorMessage: null, currentState: 'showQuestions'})
        console.log("User Signed In", result);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  getQuestions = () => {
    let apiName = "KahootCloneAPI";
    let path = "/questions";

    API.get(apiName, path)
      .then((response) => {
        const responseData = response;
        this.updateQuestions(response);
      })
      .catch((error) => {});
  };

  componentDidMount() {
    this.getUserAuthenticated();
    this.getQuestions();
  }

  render() {
    const imageStyle = {
      display: "flex",
      margin: "auto",
    };
    // this.getData()

    const { questions } = this.state;

    return (
      <div style={pageStyles}>
        <div style={titleStyles}>
          <img style={imageStyle} src={logo} alt="Logo" />
        </div>
        {questions.questions != null ? (
          <div className="board">
            <div>
              {questions.questions.map((question) => (
                <div key={question.id}>
                  <h3>{question.text}</h3>
                  {question.options.map((option) => (
                    <button key={option.id}>{option.text}</button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Questions_Component;
