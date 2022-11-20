DROP TABLE IF EXISTS markings CASCADE;
CREATE TABLE markings (
  id SERIAL PRIMARY KEY NOT NULL,
  correct BOOLEAN,
  solutions VARCHAR(255),
  question_id INTEGER REFERENCES questions(id)
);
