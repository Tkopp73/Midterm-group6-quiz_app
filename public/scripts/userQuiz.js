$(document).ready(() => {
  // console.log('volleyball');
  let counterBuffer = 0;
  const button = $('.userAnswer');
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
      $('#userResult').empty();
      $('#userResult').append($p);
    } else {
      $(event.target).css('background', '#FA1503');
      $(event.target).attr("disabled", true);
    }
  };

  button.click(handleClick);





});
