
const express = require('express');
const router  = express.Router();
const { getQuizByURL } = require("../db/queries/users");

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(shortURL);
  getQuizByURL(shortURL)
  .then((object) => {
    console.log(object);
    const obj = Object.values(object)[0];
    const templateVars = {
      quizName: obj.name,
      shortURL: obj.shorturl,
    };
  console.log("ShortURL route is working");
  res.render('shortURL', templateVars);
  })
});



module.exports = router;
