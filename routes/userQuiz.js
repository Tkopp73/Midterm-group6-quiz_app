const express = require('express');
const router  = express.Router();
const https = require('https');

router.get('/', (req, res) => {
  const user_id = req.session.users;
  let templateVars = {
    user: user_id,
  };


  res.render('userQuiz', templateVars);

});

module.exports = router;
