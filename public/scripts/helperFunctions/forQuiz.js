
const renderQuestions = (questions) => {
  const quizBody = document.querySelector('#quizContainer')
  for (const question of questions) {
    quizBody.appendChild(createQuestionElement(question));
  }
}

const createQuestionElement = (data) => {
  const quizElement = `
  <article class="eachQuestionContainer">
  <div class="questionContainer">
  <h3>${data.question}</h3>
  </div>
  <div class="answersContainer">
  <button>${data.incorrectAnswers}</button>
  <button>${data.incorrectAnswers}</button>
  <button>${data.correctAnswer}</button>
  <button>${data.incorrectAnswers}</button>
  </div>
  </article>
  `
  return quizElement;
};


module.exports = { renderQuestions }
