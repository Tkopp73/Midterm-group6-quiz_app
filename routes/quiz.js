
const express = require('express');
const router  = express.Router();
const { addUser } = require("../db/queries/users");

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const templateVars = {
    user: user_id
  };
  console.log("Quiz route is working");
  res.render('quiz', templateVars);
});

module.exports = router;
