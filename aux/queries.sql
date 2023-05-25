SELECT
  q.id AS question_id,
  q.text,
  jsonb_agg(o.*) AS options
FROM
  questions q
  LEFT JOIN options o ON q.id = o.question_id
GROUP BY
  q.id;

