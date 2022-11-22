const express = require("express");
const { addQuiz, getUsersById } = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    getUsersById(user_id).then((user) => {
      const templateVars = {
        user: user_id,
        email: user.email,
      };
      console.log("Create route is working");
      res.render("create", templateVars);
    });
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
});


module.exports = router;
