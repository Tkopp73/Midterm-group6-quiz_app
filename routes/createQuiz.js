const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log("createQuiz.js is working");
  res.render('create');
});
