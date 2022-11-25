
const express = require('express');
const router = express.Router();
const { getMyQuizByUserID } = require("../db/queries/users");

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const email = req.session.email;
  if (user_id) {
    getMyQuizByUserID(user_id)
      .then((quizzes) => {
        console.log('PRINT OBJECT:', quizzes);
        const templateVars = {
          user: user_id,
          email: email,
          quizzes: quizzes,
          grade: quizzes
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
