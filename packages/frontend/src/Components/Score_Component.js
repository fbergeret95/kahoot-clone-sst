import React from "react";
import { navigate } from "gatsby";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import Leaderboard from "./Leaderboard_Component";
import logo from "../images/perficient_logo.png";

class Score_Component extends React.Component {
  state = {
    currentScores: [],
  };

  updateScores = (currentScores) => {
    this.setState({ currentScores });
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

  getData = () => {
    let apiName = "KahootCloneAPI";
    let path = "/results";

    API.get(apiName, path)
      .then((response) => {
        console.log(response);
        this.updateScores(response);
      })
      .catch((error) => { });
  };

  componentDidMount() {
    this.getUserAuthenticated();
    this.getData();
  }

  render() {
    const imageStyle = {
      display: "flex",
      margin: "auto",
    };

    const { currentScores } = this.state;

    return (
      <>
      <div>
        {currentScores !== null ? (
          <div className="board">
            <img style={imageStyle} src={logo} alt="Logo" />
            <h1 className="leaderboard">Tabla de clasificación</h1>
            <Leaderboard Ranking={currentScores}></Leaderboard>
          </div>
        ) : (
          <div />
        )}
      </div>
      
      </>
    );
  }
}

export default Score_Component;
