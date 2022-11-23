const quizForm = {
  quiz_title: '1341234',
  question_11: 'qwerqewr',
  cb_11: '0',
  as_11: '1',
  cb_12: ['0', 'on'],
  as_12: '2',
  cb_13: '0',
  as_13: '3',
  cb_14: '0',
  as_14: '4',
  question_22: '341234',
  cb_21: ['0', 'on'],
  as_21: '5',
  cb_22: '0',
  as_22: '6',
  cb_23: '0',
  as_23: '7',
  cb_24: '0',
  as_24: '8'
};

let newForm = {};
let onlyAsForm = {};
let allCb = [];
let tempKey = "";
const allKeysForm = Object.keys(quizForm);
for (keyForm of allKeysForm) {
  if (keyForm.startsWith('question')) {
    tempKey = keyForm;
    newForm[keyForm] = { content: quizForm[keyForm] };
  } else if (keyForm.startsWith('as')) {
    newForm[tempKey][keyForm] = quizForm[keyForm];
    onlyAsForm[keyForm] = { quizForm: [keyForm] };
  } else if (keyForm.startsWith('cb')) {
    if (Array.isArray(quizForm[keyForm])) {
      // newForm[tempKey][keyForm] = 'on';
      allCb.push('on');
    } else {
      // newForm[tempKey][keyForm] = null;
      allCb.push(null);
    }
  }
};

const quizTitle = quizForm.quiz_title;
const user_id = 1;
const shortURL = "qafn32";

let queryString = `
  WITH ins1 AS (
  INSERT INTO quizzes (name, user_id, category_id, shortURL)
  VALUES ('${quizTitle}', '${user_id}', 6, '${shortURL}')
  RETURNING *),
  ins2 AS (
  INSERT INTO questions (qContent, quiz_id) VALUES`;

let counter = 1;
for (question in newForm) {
  if (counter < Object.keys(newForm).length) {
    queryString += `'('${newForm[question].content}', (SELECT id FROM ins1)),`;
    counter++;
  } else {
    queryString += `('${newForm[question].content}', (SELECT id FROM ins1)) RETURNING *)
    INSERT INTO answers(aContent, question_id, correct)
    VALUES`;
  }
}

counter = 1;
let cbcounter = 0;
for (newKey in newForm) {
  for (eachQKey in newForm[newKey]) {
    if (eachQKey !== 'content') {
      let tempCb = allCb[cbcounter];

      if (counter < allCb.length) {
        console.log(counter);
        queryString += `('${newForm[newKey][eachQKey]}', (SELECT id FROM ins2 WHERE qcontent = '${newForm[newKey].content}'), ${tempCb}),`;
        counter++;
        cbcounter++;

      } else {
        queryString += `('${newForm[newKey][eachQKey]}', (SELECT id FROM ins2 WHERE qcontent = '${newForm[newKey].content}'), ${tempCb}) RETURNING *;`;
      }
    }
  }
};
console.log(queryString);
