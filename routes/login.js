/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getUsersByEmail, getUsersById } = require('../db/queries/users');
const router  = express.Router();

router.get('/', (req, res) => {
  const user_id = req.session.users
  const templateVars = {
    user: user_id,
    email: getUsersById(user_id).email
  };
  console.log('login templatevars:', templateVars);
  console.log("Login route is working");
  res.render('login', templateVars);
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  getUsersByEmail(email, password).then((users) => {
    console.log(users);
    req.session.user_id = users.id;
    res.redirect('/')
  })
});

module.exports = router;
