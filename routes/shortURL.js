
const express = require('express');
const router = express.Router();
const { getQuizByURL, updateGrades } = require("../db/queries/users");

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  getQuizByURL(shortURL)
    .then((quizForm) => {
      const user_id = req.session.user_id;
      const email = req.session.email;
      const quizTitle = quizForm[0].quizname;
      const newObj = {};
      quizForm.forEach((row) => {
        const qcontent = row.qcontent;
        if (!newObj[qcontent]) {
          newObj[qcontent] = [];
        }
        newObj[qcontent].push(row);
      });
      console.log(newObj);
      const templateVars = {
        user: user_id,
        email: email,
        quizName: quizTitle,

        questions: newObj,
        answers: newObj
      };
      // console.log('templateVars:', templateVars);
      console.log("ShortURL route is working");
      res.render('shortURL', templateVars);
    })
    .catch((err) => { console.log(err.message); });

});

router.post('/:shortURL', (req, res) => {
  console.log('USER Quiz submitted!!!!!!!!!!!!!');
  console.log('req for create:', req.body);
  const submitAnswers = req.body;
  const sURL = req.params.shortURL;
  const user_id = req.session.user_id;
  updateGrades(sURL, submitAnswers, user_id)
  .then(() => {
    res.redirect('/myQuiz');
  })
  .catch((err) => { console.log(err.message); });
});


module.exports = router;
