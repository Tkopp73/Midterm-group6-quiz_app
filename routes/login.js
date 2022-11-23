/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getUsersByEmail } = require('../db/queries/users');
const router  = express.Router();

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const templateVars = {
    user: user_id,
  };
  console.log("Login route is working");
  res.render('login', templateVars);
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  getUsersByEmail(email, password).then((users) => {
    console.log(users);
    req.session.user_id = users.id;
    req.session.email = email;
    res.redirect('/')
  })
});

module.exports = router;
