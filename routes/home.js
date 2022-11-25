/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getMyQuizByUserIDHidden } = require('../db/queries/users');

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const email = req.session.email;
  if (user_id) {
  getMyQuizByUserIDHidden(user_id)
  .then((quizzes) => {
    const templateVars = {
      user: user_id,
      email: email,
      quizzes: quizzes

    };
      console.log('HOME templateVars:', templateVars);
      res.render('home', templateVars);
    });
  } else {
    const user_id = req.session.user_id;
    getMyQuizByUserIDHidden(user_id)
    .then((quizzes) => {
      const templateVars = {
        user: user_id,
        quizzes: quizzes
      };
      console.log('HOME templateVars:', templateVars);
      res.render('home', templateVars);
    })
  }
});

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


module.exports = router;
