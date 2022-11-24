
const express = require('express');
const router = express.Router();
const { getAllByUserID } = require("../db/queries/users");

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const email = req.session.email;
  if (user_id) {
    getAllByUserID(user_id)
      .then((quizzes) => {
        console.log('PRINT OBJECT:', quizzes);
        const templateVars = {
          user: user_id,
          email: email,
          quizzes: quizzes
        };
        console.log('TemplateVars:', templateVars)
        console.log("Quiz route is working");
        res.render('myQuiz', templateVars);
      });
  } else {
    res.redirect('/');
  }
});

/*
[
  {
    user_id: 1,
    name: 'MCU',
    id: 1,
    shorturl: 'abc123',
    category_id: 1,
    grade: 90
  },
  {
    user_id: 1,
    name: 'My Hero',
    id: 18,
    shorturl: '1wh9y2',
    category_id: 6,
    grade: 90
  },
  {
    user_id: 1,
    name: 'qjieref/lwkds',
    id: 19,
    shorturl: 'mts88y',
    category_id: 6,
    grade: 90
  },
  {
    user_id: 1,
    name: 'Please Work',
    id: 22,
    shorturl: 'wn6aj2',
    category_id: 6,
    grade: 90
  }
]
*/

module.exports = router;
