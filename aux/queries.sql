SELECT
  q.id AS question_id,
  q.question_text,
  json_agg(a.*) AS answers
FROM
  questions q
  LEFT JOIN answers a ON q.id = a.question_id
GROUP BY
  q.id;

