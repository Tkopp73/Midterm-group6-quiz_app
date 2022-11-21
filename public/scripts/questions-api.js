$(document).ready(() => {


  // --------- FILM_AND_TV --------------
  const handleSubmitFilm = (event) => {
    event.preventDefault();
    console.log("submit");

    setTimeout(() => {

      $.ajax({
        url: 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10',
        method: 'GET'
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })


    }, 500);
  };

  $(".film-tv").on("submit", handleSubmitFilm)


  // --------- HISTORY ----------------
  const handleSubmitHistory = (event) => {
    event.preventDefault();
    console.log("submit");

    setTimeout(() => {

      $.ajax({
        url: 'https://the-trivia-api.com/api/questions?categories=history&limit=10',
        method: 'GET'
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })


    }, 500);
  };

  $(".history").on("submit", handleSubmitHistory)

  // --------- GENERAL KNOWLEDGE ---------
  const handleSubmitGeneral = (event) => {
    event.preventDefault();
    console.log("submit");

    setTimeout(() => {

      $.ajax({
        url: 'https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10',
        method: 'GET'
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })


    }, 500);
  };

  $(".general-knowledge").on("submit", handleSubmitGeneral)

  // --------- FOOD_AND_DRINK --------------
  const handleSubmitFood = (event) => {
    event.preventDefault();
    console.log("submit");

    setTimeout(() => {

      $.ajax({
        url: 'https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10',
        method: 'GET'
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })


    }, 500);
  };

  $(".food-drink").on("submit", handleSubmitFood)


// ----------- MUSIC ----------------
  const handleSubmitMusic = (event) => {
    event.preventDefault();
    console.log("submit");

    setTimeout(() => {

      $.ajax({
        url: 'https://the-trivia-api.com/api/questions?categories=music&limit=10',
        method: 'GET'
      })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })


    }, 500);
  };

  $(".music").on("submit", handleSubmitMusic)




});
