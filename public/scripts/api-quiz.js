


$(document).ready(function() {
  // console.log("Volleyball")
  let counterBuffer = 0;
  const button = $('.answers');
  let $p = $('<p>');
  let text = `${counterBuffer}/10`;
  const handleClick = () => {
    // console.log('click', event.target);
    if (event.target.value === 'right') {
      $(event.target).css('background', '#2AFA00');
      $(event.target).attr("disabled", true);
      counterBuffer += 1;
      text = `${counterBuffer}/10`;
      $p.text(text);
      $('#result').empty();
      $('#result').append($p);
    } else {
      $(event.target).css('background', '#FA1503');
      $(event.target).attr("disabled", true);
    }
  };

  button.click(handleClick);


  // let timestamp = new Date().getTime();
  // console.log(timestamp)
  // 1669232761862

  // on sumbit take counter buffer and timestamp and insert into quiz submission

});

