INSERT INTO questions(id, text)
  VALUES (1, 'pregunta 1'),
(2, 'pregunta 2'),
(3, 'pregunta 3');

INSERT INTO options(id, question_id, text, is_right)
  VALUES (1, 1, 'respuesta incorrecta a pregunta 1', FALSE),
(2, 1, 'respuesta correcta a pregunta 1', TRUE),
(3, 1, 'respuesta incorrecta a pregunta 1', FALSE),
(4, 1, 'respuesta incorrecta a pregunta 1', FALSE),
(5, 2, 'respuesta incorrecta a pregunta 2', FALSE),
(6, 2, 'respuesta correcta a pregunta 2', TRUE),
(7, 2, 'respuesta incorrecta a pregunta 2', FALSE),
(8, 2, 'respuesta incorrecta a pregunta 2', FALSE),
(9, 3, 'respuesta incorrecta a pregunta 3', FALSE),
(10, 3, 'respuesta correcta a pregunta 3', TRUE),
(11, 3, 'respuesta incorrecta a pregunta 3', FALSE),
(12, 3, 'respuesta incorrecta a pregunta 3', FALSE);

--insert into users (username, email, sub) values ('fbergeret', 'fbergeretf@gmail.com', '3b968e54-a78b-4915-8b40-c7ea1ec5338c')
INSERT INTO users(username, email, sub)
  VALUES ('test1', 'test1@test.com', 'testSub1'),
('test2', 'test2@test.com', 'testSub2'),
('test3', 'test3@test.com', 'testSub3');

INSERT INTO answers(username, question_id, option_id, seconds)
  VALUES ('test1', 1, 1, 5),
('test1', 2, 7, 10),
('test1', 3, 10, 3),
('test2', 1, 2, 30),
('test2', 2, 6, 30),
('test2', 3, 10, 15),
('test3', 1, 2, 5),
('test3', 2, 7, 10),
('test3', 3, 12, 10);

