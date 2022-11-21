const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (user_id) {
    const user_id = req.session.users;
    getUserbyID(user_id).then((user) => {
      const templateVars = {
        user: user_id,
        email: user.email,
      };
      console.log("Create route is working");
      res.render("create", templateVars);
    });
  } else {
    res.redirect('/');
  }
});
