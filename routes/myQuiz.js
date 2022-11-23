
const express = require('express');
const router = express.Router();
const { getQuizByID } = require("../db/queries/users");

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const email = req.session.email;
  if (user_id) {
    getQuizByID(user_id)
      .then((object) => {
        const obj = Object.values(object)[0];
        const templateVars = {
          user: user_id,
          quizName: obj.name,
          shortURL: obj.shorturl,
          email: email
        };
        console.log('TemplateVars:', templateVars)
        console.log("Quiz route is working");
        res.render('myQuiz', templateVars);
      });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
