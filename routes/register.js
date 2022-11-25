
const express = require('express');
const router  = express.Router();
const { addUser } = require("../db/queries/users");

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const templateVars = {
    user: user_id
  };
  console.log("Register route is working");
  res.render('register', templateVars);
});


router.post('/', (req, res) => {
  console.log(req.body);
  const newUserName = req.body.name;
  const newUserEmail = req.body.email;
  const newPassword = req.body.password;
  addUser(newUserName, newUserEmail, newPassword).then(() => {
    console.log('New User has been added!!!');
    res.redirect('/login');
  })
});

module.exports = router;
