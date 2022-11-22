const express = require("express");
<<<<<<< HEAD
const { addQuiz, getUsersByEmail, getUsersById } = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    getUsersById(user_id).then((user) => {
=======
const router = express.Router();

router.get("/", (req, res) => {
  if (user_id) {
    const user_id = req.session.users;
    getUserbyID(user_id).then((user) => {
>>>>>>> registration
      const templateVars = {
        user: user_id,
        email: user.email,
      };
      console.log("Create route is working");
      res.render("create", templateVars);
    });
<<<<<<< HEAD
  }
});


router.post("/", (req, res) => {
  console.log('req for create:', req.body);
  const quizForm = req.body;
  const user = req.session.user_id;
  addQuiz(quizForm, user).then(() => {
    console.log('Adding Quiz to the form!');
    res.redirect('/');
  })
=======
  } else {
    res.redirect('/');
  }
>>>>>>> registration
});


module.exports = router;
