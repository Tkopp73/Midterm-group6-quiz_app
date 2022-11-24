
const express = require('express');
const router  = express.Router();
const { getQuizByQuizID} = require("../db/queries/users");

router.get('/:shortURL', (req, res) => {
  console.log(user_id);
  getQuizByQuizID (quiz_id)
  .then((object) => {
    console.log(object);
    const obj = Object.values(object)[0];
    const templateVars = {
      quizName: obj.name,
      shortURL: obj.shorturl,
    };
  console.log("ShortURL route is working");
  res.render('shortURL', templateVars);
  })
});
res.redirect(`/urls/${shortURL}`);

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
