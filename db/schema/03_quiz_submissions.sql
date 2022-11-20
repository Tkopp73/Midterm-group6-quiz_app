DROP TABLE IF EXISTS quiz_submissions CASCADE;
CREATE TABLE quiz_submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  grade INTEGER,
  start_at TIMESTAMP,
  end_at TIMESTAMP,
  date_submit DATE
);
