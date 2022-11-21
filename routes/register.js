
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log("Route.js is working");
  res.render('register');
});
