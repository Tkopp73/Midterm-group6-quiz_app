const express = require('express');
const router = express.Router();
const https = require('https');
const { submitApiQuiz } = require('../db/queries/users');
const { generateRandomString } = require("../db/queries/users");

router.get('/', (req, res) => {
  // console.log(req.query);
  const user_id = req.session.users;
  let templateVars = {
    user: user_id,
  };
  if (req.query.film) {
    https.get('https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10', res => {
      let data = [];
      res.on('data', chunk => data.push(chunk));

      res.on('end', () => {
        console.log('response:');
        const questions = JSON.parse(Buffer.concat(data).toString());
        // console.log(users);
        templateVars.questions = questions;
        // console.log('templateVars', templateVars);
      });
    });
    setTimeout(() => {
      res.render('quiz', templateVars);
    }, 500);
  } else if (req.query.history) {
    // console.log(req.query);
    https.get('https://the-trivia-api.com/api/questions?categories=history&limit=10', res => {
      let data = [];
      res.on('data', chunk => data.push(chunk));

      res.on('end', () => {
        console.log('response:');
        const questions = JSON.parse(Buffer.concat(data).toString());
        // console.log(questions);
        templateVars.questions = questions;
        // console.log('templateVars', templateVars);
      });
    });
    setTimeout(() => {
      res.render('quiz', templateVars);
    }, 500);
  } else if (req.query.general) {
    // console.log(req.query);
    https.get('https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10', res => {
      let data = [];
      res.on('data', chunk => data.push(chunk));

      res.on('end', () => {
        console.log('response:');
        const questions = JSON.parse(Buffer.concat(data).toString());
        // console.log(questions);
        templateVars.questions = questions;
        // console.log('templateVars', templateVars);
      });
    });
    setTimeout(() => {
      res.render('quiz', templateVars);
    }, 500);
  } else if (req.query.food) {
    // console.log(req.query);
    https.get('https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10', res => {
      let data = [];
      res.on('data', chunk => data.push(chunk));

      res.on('end', () => {
        console.log('response:');
        const questions = JSON.parse(Buffer.concat(data).toString());
        // console.log(questions);
        templateVars.questions = questions;
        // console.log('templateVars', templateVars);
      });
    });
    setTimeout(() => {
      res.render('quiz', templateVars);
    }, 500);
  } else if (req.query.music) {
    // console.log(req.query);
    https.get('https://the-trivia-api.com/api/questions?categories=music&limit=10', res => {
      let data = [];
      res.on('data', chunk => data.push(chunk));

      res.on('end', () => {
        console.log('response:');
        const questions = JSON.parse(Buffer.concat(data).toString());
        // console.log(questions);
        templateVars.questions = questions;
        // console.log('templateVars', templateVars);
      });
    });
    setTimeout(() => {
      res.render('quiz', templateVars);
    }, 500);
  }
});

router.post("/", (req, res) => {
  console.log('Quiz submitted!!!!!!!!!!!!!');
  let counterBuffer = 100;
  let userID = req.session.user_id;
  let name = 'Supplied Quiz';
  let shortURL = generateRandomString();
  const values = [name, userID, shortURL, counterBuffer];
  const queryString = `WITH ins1 AS (
    INSERT INTO quizzes (name, user_id, shortURL)
    VALUES ($1, $2, $3)
    RETURNING *)
    INSERT INTO quiz_submissions (grade,  date_submit, user_id, quiz_id)
    Values ($4, (CAST(NOW() AS TIMESTAMP)), $2,(SELECT id FROM ins1));`;

  submitApiQuiz(queryString, values);


  res.redirect('/myQuiz');
});





//-------------------------AJAX---------------------------------------------------
// // --------- FILM_AND_TV --------------
// const handleSubmitFilm = (event) => {
//   event.preventDefault();
//   console.log("submit");

//   setTimeout(() => {

//     $.ajax({
//       url: 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10',
//       method: 'GET'
//     })
//     .then(response => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     })


//   }, 500);
// };
// $(document).ready(function() {

// const filmButton = document.getElementsByClassName('film-tv');
// filmButton.addEventListener("submit", handleSubmitFilm)
// });

//   // --------- HISTORY ----------------
//   const handleSubmitHistory = (event) => {
//     event.preventDefault();
//     // console.log("submit");

//     setTimeout(() => {

//       $.ajax({
//         url: 'https://the-trivia-api.com/api/questions?categories=history&limit=10',
//         method: 'GET'
//       })
//       .then(response => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       })


//     }, 500);
//   };

//   $(".history").on("submit", handleSubmitHistory)

//   // --------- GENERAL KNOWLEDGE ---------
//   const handleSubmitGeneral = (event) => {
//     event.preventDefault();
//     // console.log("submit");

//     setTimeout(() => {

//       $.ajax({
//         url: 'https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10',
//         method: 'GET'
//       })
//       .then(response => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       })


//     }, 500);
//   };

//   $(".general-knowledge").on("submit", handleSubmitGeneral)

//   // --------- FOOD_AND_DRINK --------------
//   const handleSubmitFood = (event) => {
//     event.preventDefault();
//     // console.log("submit");

//     setTimeout(() => {

//       $.ajax({
//         url: 'https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10',
//         method: 'GET'
//       })
//       .then(response => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       })


//     }, 500);
//   };

//   $(".food-drink").on("submit", handleSubmitFood)


// // ----------- MUSIC ----------------
//   const handleSubmitMusic = (event) => {
//     event.preventDefault();
//     // console.log("submit");

//     setTimeout(() => {

//       $.ajax({
//         url: 'https://the-trivia-api.com/api/questions?categories=music&limit=10',
//         method: 'GET'
//       })
//       .then(response => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       })


//     }, 500);
//   };

//   $(".music").on("submit", handleSubmitMusic)



module.exports = router;
