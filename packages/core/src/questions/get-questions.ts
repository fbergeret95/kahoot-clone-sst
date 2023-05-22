import { Questions } from "./types";

export async function getQuestions(): Promise<Questions> {
  const questions: Questions = {
    amount: 1,
    questions: [{
      id: 1,
      text: "La están robando?",
      answers: [{
        id: 1,
        text: "Si"
      },
      {
        id: 2,
        text: "Si pero la opción 2"
      }
      ]
    }]
  }

  return questions;
}