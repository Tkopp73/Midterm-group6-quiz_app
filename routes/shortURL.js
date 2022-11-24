
const express = require('express');
const router = express.Router();
const { getQuizByURL } = require("../db/queries/users");
const { submitApiQuiz } = require("../db/queries/users");
const { getQuizIDWithShortURL } = require("../db/queries/users");

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;

  getQuizByURL(shortURL)
    .then((object) => {
      let asArray = []; // All answer contents in an Aarray
      let cbArray = []; // All corret answers in an Array
      let qArray = []; // All question contents in an array
      let quizTitle = '';
      let url = '';
      for (obj of object) {
        quizTitle = obj.name;
        url = obj.shorturl;
        for (key in obj) {
          if (key === 'acontent') {
            asArray.push(obj[key]);
          } else if (key === 'correct') {
            cbArray.push(obj[key]);
          } else if (key.includes('qcontent')) {
            qArray.push(obj[key]);
          }
        }
      }
      qArray = [...new Set(qArray)];

      let correct = [];
      let otherAnswers = [];

      for (let i = 0; i < asArray.length; i++) {
        if (cbArray[i] === "on") {
          correct.push(asArray[i]);
        } else {
          otherAnswers.push(asArray[i]);
        }
      }
      const user_id = req.session.user_id;
      const email = req.session.email;
      const templateVars = {
        user: user_id,
        email: email,
        quizName: quizTitle,
        shortURL: url,
        questions: qArray,
        answers: otherAnswers,
        correct: correct
      };
      console.log('templateVars:', templateVars);
      console.log("ShortURL route is working");
      res.render('shortURL', templateVars);
    })
    .catch((err) => { console.log(err.message); });

});

router.post('/:shortURL', (req, res) => {
  const sURL = req.params.shortURL;
  console.log('USER Quiz submitted!!!!!!!!!!!!!');
  let counterBuffer = 10;
  const userID = req.session.user_id;
  const values = [counterBuffer, userID];
  const queryString2 = `
    INSERT INTO quiz_submissions (grade, date_submit, user_id, quiz_id)
    VALUES ($1, (CAST(NOW() AS TIMESTAMP)), $2, (SELECT quizzes.id FROM quizzes
    WHERE shortURL = '${sURL}'));
    `;

  console.log(queryString2);

  submitApiQuiz(queryString2, values);

  res.redirect('/myQuiz');
});

// const getQnA(qContent, aContent) => {
//     questions = [];
//     answers = [];
//     questions.push(qContent);
//     answers.push(aContent);
// };

/*
-[ RECORD 1 ]---------------------------
qcontent | Which year did we start Wazup
acontent | 15
-[ RECORD 2 ]---------------------------
qcontent | Which year did we start Wazup
acontent | 14
-[ RECORD 3 ]---------------------------
qcontent | Which year did we start Wazup
acontent | 13
-[ RECORD 4 ]---------------------------
qcontent | Which year did we start Wazup
acontent | 12
*/


module.exports = router;
