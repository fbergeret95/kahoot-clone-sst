INSERT INTO questions(id, text)
  VALUES (1, 'pregunta 1'),
(2, 'pregunta 2');

INSERT INTO answers(id, question_id, text, is_right)
  VALUES (1, 1, 'respuesta incorrecta a pregunta 1', FALSE),
(2, 1, 'respuesta correcta a pregunta 1', TRUE),
(3, 2, 'respuesta incorrecta a pregunta 2', FALSE),
(4, 2, 'respuesta correcta a pregunta 2', TRUE);

