const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserQuizzes = () => {
  const queryString = `SELECT users.name as username, quizzes.* FROM users
  JOIN quizzes ON quizzes.user_id = users.id WHERE isHidden = '0';`;
  return db.query(queryString)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
}


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
  SELECT users.id As user_id, users.name, quizzes.*
  FROM users
  JOIN quizzes ON quizzes.user_id = users.id
  WHERE users.id = $1
  GROUP BY users.id, quizzes.id;
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
// used on myQuiz
const getMyQuizByUserID = (id) => {
  const queryString = `
  SELECT users.id As user_id, users.name, quizzes.*, quiz_submissions.grade
  FROM quiz_submissions
  JOIN quizzes ON quizzes.id = quiz_submissions.quiz_id
  JOIN users ON quiz_submissions.user_id = users.id
  GROUP BY users.id, quizzes.id, quiz_submissions.id;
  `;

  return db.query(queryString)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

const getMyQuizByUserIDHidden = (id) => {
  const queryString = `
  SELECT users.id As user_id, users.name, quizzes.*, quiz_submissions.grade
  FROM quiz_submissions
  JOIN quizzes ON quizzes.id = quiz_submissions.quiz_id
  JOIN users ON quiz_submissions.user_id = users.id
  WHERE quizzes.isHidden = '0'
  GROUP BY users.id, quizzes.id, quiz_submissions.id;
  `;

  return db.query(queryString)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

const getQuizByURL = (shortURL) => {
  console.log(shortURL);
  const values = [shortURL];
  const queryString = `
  SELECT quizzes.name As quizName, questions.*, answers.acontent, answers.correct, answers.id As answer_id
  FROM quizzes
  JOIN questions ON quizzes.id = questions.quiz_id
  JOIN answers ON  questions.id = answers.question_id
  WHERE shortURL = $1
  GROUP BY answers.id, quizzes.id, questions.id;
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


const getQuizByID = (id) => {
  const values = [id];
  const queryString = `
  SELECT users.*, quizzes.*, questions.*, answers.*
  FROM users
  JOIN quizzes ON quizzes.user_id = users.id
  JOIN questions ON questions.quiz_id = quizzes.id
  JOIN answers ON answers.question_id = questions.id
  WHERE users.id = $1
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
  let isHidden = quizForm.isHidden;
  if(isHidden === 'on') {
    isHidden = 1;
  } else {
    isHidden = 0;
  };

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
        allCb.push('on');
      } else {
        allCb.push(null);
      }
    }
  };

  console.log(newForm);

  let queryString = `
  WITH ins1 AS (
  INSERT INTO quizzes (name, user_id, category_id, shortURL, isHidden)
  VALUES ('${quizTitle}', '${user_id}', 6, '${shortURL}', '${isHidden}')
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
          console.log("counter:", counter);
          queryString += `('${newForm[newKey][eachQKey]}', (SELECT id FROM ins2 WHERE qcontent = '${newForm[newKey].content}'), '${tempCb}'),`;
          counter++;
          cbcounter++;

        } else {
          queryString += `('${newForm[newKey][eachQKey]}', (SELECT id FROM ins2 WHERE qcontent = '${newForm[newKey].content}'), '${tempCb}') RETURNING *;`;
        }
      }
    }
  };
  console.log(queryString);
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




const updateGrades = (sURL, quizForm, user_id) => {

  allKeysObject = Object.keys(quizForm)
  let answerArray = [];
  for(value of allKeysObject) {
    if(value.startsWith('question')) {
      answerArray.push(quizForm[value]);
  }
}
  const values = [sURL];
  const queryString = `SELECT questions.id AS question_id, answers.id AS answer_id
  FROM questions
  JOIN answers ON answers.question_id = questions.id AND answers.correct = 'on'
  JOIN quizzes ON quizzes.id = questions.quiz_id
  WHERE quizzes.shorturl = $1;`
  return db.query(queryString, values)
    .then((result) => {
      let countBuffer = 0;

      for (let i = 0; i < result.rows.length; i++){
        if ( answerArray[i] == result.rows[i].answer_id) {
          countBuffer++;
        }
      }
      const score = (countBuffer/result.rows.length*100);
      // console.log('score', score);

      const values2 = [score, user_id, sURL];
      const queryString2 = `
      INSERT INTO quiz_submissions (grade, date_submit, user_id, quiz_id)
      VALUES ($1, (CAST(NOW() AS TIMESTAMP)), $2, (SELECT quizzes.id FROM quizzes
      WHERE shortURL = $3));
      `;
      return db.query(queryString2, values2)
      .then(() => {})
    .catch((err) => {
      console.log(err.message);
    });

})
};


const submitApiQuiz = (queryString, values) => {
  return db.query(queryString, values)
    .then((res) => {
      console.log("res.rows:", res.rows);
      return res.rows;
    })
    .catch((error) => {
      console.log('error:', error.message);
      return error;
    });
};


const getQuizIDWithShortURL = (queryString) => {

  return db.query(queryString)
  .then((res) => {
    console.log("res.rows:", res.rows[0]);
    return res.rows[0];
  })
  .catch((err) => {
    console.log('err', err.message);
    return err;
  })
}

const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
};


module.exports = { getUsers, getAllByUserID, getUsersByEmail, getUsersById, addQuiz, addUser, getQuizByID, getQuizByQuizID, getQuizByURL, generateRandomString, submitApiQuiz, getQuizIDWithShortURL, getUserQuizzes, updateGrades, getMyQuizByUserID, getMyQuizByUserIDHidden };

