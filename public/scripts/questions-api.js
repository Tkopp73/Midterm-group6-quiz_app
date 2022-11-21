$(document).ready(() => {

  const handleSubmitFilm = (event) => {
    event.preventDefault();
    console.log("submit");

    setTimeout(() => {

      $.ajax({
        url: 'https://the-trivia-api.com/api/questions?limit=10',
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
});
