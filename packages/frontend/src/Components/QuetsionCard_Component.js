import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { navigate } from "gatsby";

import logo from "../images/perficient_logo.png";
import { Amplify, Auth } from "aws-amplify";

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
  margin: "2%",
  minWidth: "400px",
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

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.GATSBY_APP_REGION,
    userPoolId: process.env.GATSBY_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_APP_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "KahootCloneAPI",
        endpoint: process.env.GATSBY_APP_API_URL,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
});


class Questions_Component extends React.Component {
  state = {
    response: {},
    currentQuestionIndex: 0,
    currentQuestionSet: 0
  };
  updateCurrentQuestionSetIndex = (currentQuestionSet) => {
    this.setState({ currentQuestionSet });
  };
  updateCurrentQuestionIndex = (currentQuestionIndex) => {
    this.setState({ currentQuestionIndex });
  };
  updateResponse = (response) => {
    this.setState({ response });
  };



  getUserAuthenticated = () => {


    Auth.currentAuthenticatedUser()
      .then((result) => {
        console.log("User Signed In", result);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  getQuestions = () => {
    let apiName = "KahootCloneAPI";
    let path = "/questions";

    console.log("getQuestions")

    API.get(apiName, path)
      .then((response) => {

        if (response.game_status.remaining_questions === 0) {
          navigate("/score_page")
        } else {
          const responseData = response;
          this.updateResponse(response);
          this.updateCurrentQuestionIndex(
            response.amount -
            response.game_status.remaining_questions
          );
          this.updateCurrentQuestionSetIndex(response.amount)
          this.startTime()
        }
      })
      .catch((error) => {

        console.log(error)

        if (error.response.data.error === 'GameNotConfigured') {
          alert("El juego aún no ha comenzado")
        } else if (error.response.data.error === 'GameFinished') {
          console.log("GameFinished")
          navigate("/score_page")
        }

      });
  };

  postAnswer = (questionId, optionId) => {

    let startTime = localStorage.getItem("timeStart")
    let endtime = this.endtime()

    let apiName = "KahootCloneAPI";
    let path = "/answers";
    let myInit = {
      body: {
        option_id: optionId,
        question_id: questionId,
        start: startTime,
        end: endtime
      }
    }

    API.post(apiName, path, myInit)
      .then((response) => {
        this.handleAnswerClick()
      })
      .catch((error) => {
        if (error.response.data.error === 'GameNotConfigured') {
          alert("El juego aún no ha comenzado")
        } else if (error.response.data.error === 'GameFinished') {
          console.log("GameFinished")
          navigate("/score_page")
        }
      })
  }

  handleAnswerClick = () => {

    const { currentQuestionIndex } = this.state;
    const { currentQuestionSet } = this.state;

    console.log(currentQuestionIndex)
    console.log(currentQuestionSet)

    if (currentQuestionIndex < currentQuestionSet - 1) {
      this.updateCurrentQuestionIndex(currentQuestionIndex + 1);
      this.startTime()
    } else {
      navigate("/score_page")
    }
  };

  startTime = () => {
    let timeStart = new Date()
    localStorage.removeItem("timeStart")
    localStorage.setItem("timeStart", timeStart.toISOString())
  }

  endtime = () => {
    let timeEnd = new Date()
    return timeEnd.toISOString()
  }

  componentDidMount() {
    this.getUserAuthenticated();
    this.getQuestions();
  }

  render() {
    const imageStyle = {
      display: "flex",
      margin: "auto",
    };

    const { response } = this.state;
    const { currentQuestionIndex } = this.state;

    return (
      <div style={pageStyles}>
        <div style={titleStyles}>
          <img style={imageStyle} src={logo} alt="Logo" />
        </div>
        {response.questions != null ? (
          <div className="board">
            <div>
              {response.questions.map((question, index) => (
                index === currentQuestionIndex ? (
                  <div key={question.id - 1}>
                    <h3 key={`header_${question.id}`}>{question.text}</h3>
                    {question.options.map((option) => (
                      <button style={customStyleBtn} key={option.id} onClick={() => this.postAnswer(question.id, option.id)}>{option.text}</button>
                    ))}
                  </div>
                ) : (
                  <div key={Math.random()} />
                )
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
