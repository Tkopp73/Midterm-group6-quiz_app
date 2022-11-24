
const getQuizIDWithShortURL = (queryString) => {

    return db.query(queryString)
    .then((res) => {
        console.log("res.rows:", res.rows);
        return res.rows;
      })
      const getID = () => {
        rows.then((a) => {
          console.log(a);
        });
      };
      getID();
    }
    .catch((err) => {
      console.log('err', err.message);
      return err;
    })

<<<<<<< HEAD
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
=======
>>>>>>> myNewBranch
