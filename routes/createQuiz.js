const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log("Creating Quize Route is working!!!");
  res.render('create');
});
