-- Get questions
SELECT
  q.id AS question_id,
  q.text,
  jsonb_agg(o.*) AS options
FROM
  questions q
  LEFT JOIN options o ON q.id = o.question_id
GROUP BY
  q.id;

-- Get Results
SELECT
  username,
  count(o.id) AS score,
(
    SELECT
      sum(seconds)
    FROM
      answers an
    WHERE
      an.username = a.username) AS time
FROM
  answers a
  JOIN options o ON a.option_id = o.id
WHERE
  o.is_right = TRUE
GROUP BY
  username
ORDER BY
  score DESC,
  time ASC;

