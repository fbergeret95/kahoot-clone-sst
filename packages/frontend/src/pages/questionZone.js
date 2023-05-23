import React from "react";

const questionTextStyles = {
  fontSize: "3.2rem",
};
const questionCardStyles = {
  borderRadius: "12px",
  border: "1px solid grey",
};

const answerCardStyles = {
  borderRadius: "8px",
  border: "1px solid grey",
  backgroundColor: "#FFB84C",
  height: "200px",
  justifyContent: "center",
};

const questionAnswerStyles = {
  fontSize: "4.5rem",
  fontWeight: "100",
};

const card = {
  margin: "20px",
  padding: "20px",
  width: "90%",
  minHeight: "400px",
  display: "grid",
  borderRadius: "20px",
  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
  transition: "all 0.2s",
};
const cards = {
  display: "flex",
  flexWrap: "wrap",
  textAlign: "center",
  justifyContent: "center",
};
const card__exit = {
  position: "relative",
  textDecoration: "none",
  color: "rgba(255, 255, 255, 0.9)",
  gridRow: "1/2",
  justifySelf: "end",
};
const card__link = {
  position: "relative",
  textDecoration: "none",
  color: "rgba(255, 255, 255, 0.9)",
};
const card__icon = {
  position: "relative",
  textDecoration: "none",
  color: "rgba(255, 255, 255, 0.9)",
};
const card__title = {};
const card__apply = {};

// COLORS;
// FFB84C
// F266AB;
// A459D1;
// 2CD3E1

// 2. ¿Qué tecnología se utiliza para hacer posibles las llamadas
//               telefónicas a través de Internet?

// a) Ethernet

// b) Bluetooth

// c) POP

// d) VoIP

const QuestionZoneComponent = () => {
  return (
    <div className="questionZoneCard text-center">
      <div className="row">
        <div className="col">
          <div style={questionCardStyles} className="p-5 my-5">
            <p style={questionTextStyles} className="m-3">
              ¿Qué tecnología se utiliza para hacer posibles las llamadas
              telefónicas a través de Internet?
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div style={answerCardStyles} className="my-5 p-4">
            <h1 style={questionAnswerStyles}>Ethernet</h1>
          </div>
        </div>
        <div className="col-12">
          <div style={answerCardStyles} className="my-5 p-4">
            <h1 style={questionAnswerStyles}>Ethernet</h1>
          </div>
        </div>
        <div className="col-12">
          <div style={answerCardStyles} className="my-5 p-4">
            <h1 style={questionAnswerStyles}>Ethernet</h1>
          </div>
        </div>
        <div className="col-12">
          <div style={answerCardStyles} className="my-5 p-4">
            <h1 style={questionAnswerStyles}>Ethernet</h1>
          </div>
        </div>
      </div>

      <div className="cards" style={cards}>
        <div class="card card_1" style={card}>
          <div class="card__icon" style={card__icon}>
            <i class="fas fa-bolt"></i>
          </div>
          <p class="card__exit" style={card__exit}>
            <i class="fas fa-times"></i>
          </p>
          <h2 class="card__title" style={card__title}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <p class="card__apply" style={card__apply}>
            <a class="card__link" href="#" style={card__link}>
              Apply Now <i class="fas fa-arrow-right"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
    //   <div className="answerZoneDiv">
    //     <div className="answerZoneCard"></div>
    //   </div>
  );
};

export default QuestionZoneComponent;
