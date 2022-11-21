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
  console.log("Route.js is working");
  res.render('login');
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log("PRINT:", email, password);
  console.log(getUsersByEmail(email));
  res.redirect('/')
});

module.exports = router;
