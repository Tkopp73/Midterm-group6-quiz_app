// Client facing scripts here
$(document).ready(function() {



// category film and tv
  const handleSubmitFilm = event => {
    event.preventDefault();
    console.log("hello from button film and tv");

    $.ajax({
      url: `https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10`,
      method: 'GET'
    })
      .then(response => {
        console.log(response)
      })
  };

$('.film-tv').on('submit', handleSubmitFilm);


//categery music
const handleSubmitMusic = (event) => {
  event.preventDefault();
  console.log("hello from button music");

  $.ajax({
    url: `https://the-trivia-api.com/api/questions?categories=music&limit=10`,
    method: 'GET'
  })
    .then(response => {
      console.log(response)
    })
};

$('.music').on('submit', handleSubmitMusic);


// category history
const handleSubmitHistory = (event) => {
  event.preventDefault();
  console.log("hello from button history");

  $.ajax({
    url: `https://the-trivia-api.com/api/questions?categories=history&limit=10`,
    method: 'GET'
  })
    .then(response => {
      console.log(response)
    })
};

$('.history').on('submit', handleSubmitHistory);


// category general knowledge
const handleSubmitGeneralKnowledge = (event) => {
  event.preventDefault();
  console.log("hello from button general knowledge");

  $.ajax({
    url: `https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10`,
    method: 'GET'
  })
    .then(response => {
      console.log(response)
    })
};

$('.general-knowledge').on('submit', handleSubmitGeneralKnowledge);


// category food and drink
const handleSubmitFood = (event) => {
  event.preventDefault();
  console.log("hello from button food and drink");

  $.ajax({
    url: `https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10`,
    method: 'GET'
  })
    .then(response => {
      console.log(response)
    })
};

$('.food-drink').on('submit', handleSubmitFood);



});





