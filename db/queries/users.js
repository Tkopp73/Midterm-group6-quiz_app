const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersByEmail = (email, password) => {
  const querryString = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const input = [email, password];

  return db.query(querryString, input)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log(err.message);
    return err;
  });
}

const getUsersById = (id) => {
  const querryString = `SELECT * FROM users WHERE id = $1`;
  const input = [id];

  return db.query(querryString, input)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log(err.message);
    return err;
  });
}

const getQuizById = (id) => {
  const querryString = ;
  const input = [id];

  return db.query(querryString, input)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log(err.message);
    return err;
  });
}

const addQuiz = (quizForm, user) => {
  const values = [quizForm.quiz_title, user, quizForm.question_01, quizForm.answer_01_a, quizForm.a1a, quizForm.answer_01_b, quizForm.a1b, quizForm.answer_01_c, quizForm.a1c, quizForm.answer_01_d, quizForm.a1d];
  const queryString = `
  WITH ins1 AS (
  INSERT INTO quizzes (name, user_id, category_id)
  VALUES ($1, $2, 6)
  RETURNING *),
  ins2 AS (
  INSERT INTO questions (content, quiz_id)
  VALUES ($3, (SELECT id FROM ins1)))
  INSERT INTO answers (content, question_id, correct)
  VALUES ($4, 1, $5),  ($6, 1, $7),  ($8, 1, $9), ($10, 1, $11)
  RETURNING *;`;

  return db
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


const addUser = (newUserName, newUserEmail, newPassword) => {
  const values = [newUserName, newUserEmail, newPassword];
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3);`;
  return db.query(queryString, values)
  .then((result) => {
    console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { getUsers, getUsersByEmail, getUsersById, addQuiz, addUser };

