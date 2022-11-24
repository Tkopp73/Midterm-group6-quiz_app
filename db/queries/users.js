const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersByEmail = (email, password) => {
  const queryString = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const values = [email, password];

  return db.query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

const getUsersById = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return db.query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

const getAllByUserID = (id) => {
  const values = [id];
  const queryString = `
  SELECT users.id As user_id, users.name, quizzes.*, quiz_submissions.grade
  FROM users
  JOIN quizzes ON quizzes.user_id = users.id
  JOIN quiz_submissions ON quiz_submissions.user_id = users.id
  WHERE users.id = $1
  GROUP BY users.id, quizzes.id, quiz_submissions.grade;
  `;

  return db.query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

const getQuizByURL = (shortURL) => {
  const values = [shortURL];
  const queryString = `
  SELECT quizzes.*, questions.*, answers.*
  FROM quizzes
  JOIN questions ON quizzes.id = questions.quiz_id
  JOIN answers ON  questions.id = answers.question_id
  WHERE shortURL = '$1'
  GROUP BY quizzes.id, questions.id, answers.id
  `;
  return db.query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
}


const getQuizByID = (id) => {
  const values = [id];
  const queryString = `
  SELECT users.*, quizzes.*, questions.*, answers.*
  FROM users
  JOIN quizzes ON quizzes.user_id = users.id
  JOIN questions ON questions.quiz_id = quizzes.id
  JOIN answers ON answers.question_id = questions.id
  WHERE users.id =$1
  GROUP BY users.id, quizzes.id, questions.id, answers.id;
  `;

  return db.query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};


const getQuizByQuizID = (quiz_id) => {
  const values = [quiz_id];
  const queryString = `
  SELECT questions.qcontent, answers.acontent FROM questions
  JOIN answers ON answers.question_id = questions.id
  WHERE questions.quiz_id = $1;`;
  return db.query(queryString, values)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

const addQuiz = (quizForm, user) => {
  const shortURL = generateRandomString();
  const user_id = user;
  const quizTitle = quizForm.quiz_title;
  let newForm = {};
  let onlyAsForm = {};
  let allCb = [];
  let tempKey = "";
  const allKeysForm = Object.keys(quizForm);
  for (keyForm of allKeysForm) {
    if (keyForm.startsWith('question')) {
      tempKey = keyForm;
      newForm[keyForm] = { content: quizForm[keyForm] };
    } else if (keyForm.startsWith('as')) {
      newForm[tempKey][keyForm] = quizForm[keyForm];
      onlyAsForm[keyForm] = { quizForm: [keyForm] };
    } else if (keyForm.startsWith('cb')) {
      if (Array.isArray(quizForm[keyForm])) {
        // newForm[tempKey][keyForm] = 'on';
        allCb.push('on');
      } else {
        // newForm[tempKey][keyForm] = null;
        allCb.push(null);
      }
    }
  };

  let queryString = `
  WITH ins1 AS (
  INSERT INTO quizzes (name, user_id, category_id, shortURL)
  VALUES ('${quizTitle}', '${user_id}', 6, '${shortURL}')
  RETURNING *),
  ins2 AS (
  INSERT INTO questions (qContent, quiz_id) VALUES`;

  let counter = 1;
  for (question in newForm) {
    if (counter < Object.keys(newForm).length) {
      queryString += `('${newForm[question].content}', (SELECT id FROM ins1)),`;
      counter++;
    } else {
      queryString += `('${newForm[question].content}', (SELECT id FROM ins1)) RETURNING *)
    INSERT INTO answers(aContent, question_id, correct)
    VALUES`;
    }
  }

  counter = 1;
  let cbcounter = 0;
  for (newKey in newForm) {
    for (eachQKey in newForm[newKey]) {
      if (eachQKey !== 'content') {
        let tempCb = allCb[cbcounter];

        if (counter < allCb.length) {
          console.log(counter);
          queryString += `('${newForm[newKey][eachQKey]}', (SELECT id FROM ins2 WHERE qcontent = '${newForm[newKey].content}'), '${tempCb}'),`;
          counter++;
          cbcounter++;

        } else {
          queryString += `('${newForm[newKey][eachQKey]}', (SELECT id FROM ins2 WHERE qcontent = '${newForm[newKey].content}'), '${tempCb}') RETURNING *;`;
        }
      }
    }
  };
  return db.query(queryString)
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
};

const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
};


module.exports = { getUsers, getAllByUserID, getUsersByEmail, getUsersById, addQuiz, addUser, getQuizByID, getQuizByQuizID, getQuizByURL };

