import { Answer } from '../answers';

export type Question = {
  id: number,
  text: string,
  answers: Answer[]
}

export type Questions = {
  amount: number,
  questions: Question[],
}