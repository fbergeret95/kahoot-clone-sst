import React from "react";

fetch("https://633eda4383f50e9ba3ba341d.mockapi.io/api/getQuestions")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then((data) => {
    // Handle the data returned from the API
    updateDataOnSite(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error("Error:", error);
  });

function updateDataOnSite(data) {
  const questions = data.questions;
  const answers = data.answers;

  var question_text = document.getElementById("#question_text");
  console.log(
    "🚀 ~ file: Questions_Components.js:26 ~ updateDataOnSite ~ question_text:",
    question_text
  );
  question_text.innerHTML = questions.idt;
}

const Question_Component = () => {
  return (
    <>
      {/* <div className="row col">
        <div className="alert alert-primary text-center " role="alert">
          ¿Cuál es la red social más usada del mundo?
        </div>
      </div> */}
      <div className="row col">
        <div className="card text-black bg-light mb-3">
          <div className="card-body">
            <h5 id="question_text" className="card-title py-2 text-center"></h5>
            <hr></hr>
            <div className="text-center ">
              <div className="row">
                <div className="card text-white bg-secondary mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Facebook</h5>
                  </div>
                </div>
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Twitter</h5>
                  </div>
                </div>
                <div className="card text-white bg-warning mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Other</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-5">
        <button type="button" className="btn btn-secondary">
          NEXT
        </button>
      </div>
    </>
  );
};

export default Question_Component;
