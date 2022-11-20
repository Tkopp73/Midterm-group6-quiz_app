DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_submission_id INTEGER REFERENCES quiz_submissions(id),
  question_id INTEGER REFERENCES questions(id),
  marking_id INTEGER REFERENCES markings(id)
);
