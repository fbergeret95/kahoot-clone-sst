export interface Answers {
  id: number;
  question_id: number;
  text: string;
  is_right: boolean;
}

export interface Questions {
  id: number;
  text: string;
}

export interface Database {
  answers: Answers;
  questions: Questions;
}
