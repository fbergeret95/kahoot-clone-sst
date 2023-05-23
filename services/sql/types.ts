export interface Answers {
  id: number;
  question_id: number | null;
  text: string | null;
  is_right: boolean | null;
}

export interface Questions {
  id: number;
  text: string | null;
}

export interface Database {
  answers: Answers;
  questions: Questions;
}
