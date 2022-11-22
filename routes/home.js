/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUsersById } = require('../db/queries/users');

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
  getUsersById(user_id)
  .then((user) => {
    const templateVars = {
      user: user_id,
      email: user.email
    };
      console.log('templateVars:', templateVars);
      res.render('home', templateVars);
    });
  } else {
    const user_id = req.session.user_id;
    const templateVars = {
      user: user_id
    };
    res.render('home', templateVars);
  }
});

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


module.exports = router;
