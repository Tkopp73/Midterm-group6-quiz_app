// Client facing scripts here
$(document).ready(() => {

  const handleSubmitFilm = (event) => {
    event.preventDefault();

    $.ajax({
      url: 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10',
      method: 'GET'
    })
    .then(response => {
      console.log(response);
    })
  };


  $("#film&music").on("submit", handleSubmitFilm )
});
