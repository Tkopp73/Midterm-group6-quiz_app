const quizForm = [
  {
  quizname: 'About David',
  id: 11,
  qcontent: 'Who is David',
  quiz_id: 3,
  acontent: 'Sams Friend',
  correct: 'on'
},
{
  quizname: 'About David',
  id: 11,
  qcontent: 'Who is David',
  quiz_id: 3,
  acontent: 'Tims Friend',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 11,
  qcontent: 'Who is David',
  quiz_id: 3,
  acontent: 'Andys Friend',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 11,
  qcontent: 'Who is David',
  quiz_id: 3,
  acontent: 'I do not know',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 12,
  qcontent: 'What do David do',
  quiz_id: 3,
  acontent: 'Police',
  correct: 'on'
},
{
  quizname: 'About David',
  id: 12,
  qcontent: 'What do David do',
  quiz_id: 3,
  acontent: 'Software Developer',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 12,
  qcontent: 'What do David do',
  quiz_id: 3,
  acontent: 'Fire Fighter',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 12,
  qcontent: 'What do David do',
  quiz_id: 3,
  acontent: 'Doctor',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 13,
  qcontent: 'How old is he',
  quiz_id: 3,
  acontent: '19',
  correct: 'on'
},
{
  quizname: 'About David',
  id: 13,
  qcontent: 'How old is he',
  quiz_id: 3,
  acontent: '26',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 13,
  qcontent: 'How old is he',
  quiz_id: 3,
  acontent: '27',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 13,
  qcontent: 'How old is he',
  quiz_id: 3,
  acontent: '28',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 14,
  qcontent: 'What is his favorite food',
  quiz_id: 3,
  acontent: 'Hot Dogs',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 14,
  qcontent: 'What is his favorite food',
  quiz_id: 3,
  acontent: 'Pizza',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 14,
  qcontent: 'What is his favorite food',
  quiz_id: 3,
  acontent: 'Instant Noodle',
  correct: 'on'
},
{
  quizname: 'About David',
  id: 14,
  qcontent: 'What is his favorite food',
  quiz_id: 3,
  acontent: 'Hamburger',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 15,
  qcontent: 'Where is he from',
  quiz_id: 3,
  acontent: 'Canada',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 15,
  qcontent: 'Where is he from',
  quiz_id: 3,
  acontent: 'US',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 15,
  qcontent: 'Where is he from',
  quiz_id: 3,
  acontent: 'Mexico',
  correct: 'null'
},
{
  quizname: 'About David',
  id: 15,
  qcontent: 'Where is he from',
  quiz_id: 3,
  acontent: 'Taiwan',
  correct: 'on'
}];

// let newForm = {};
// let quiztitle = '';
// let tempQKey = '';

// for (obj of quizForm) {
//   quiztitle = quizForm.quizname;
//   for (objKey in obj) {
//     if(objKey === 'qcontent') {
//       newForm[obj[objKey]] = {};
//       tempQKey = obj[objKey];
//     } else if(objKey === 'acontent') {
//       newForm[tempQKey] = {[obj[objKey]]: 1};
//       // console.log(newForm);
//       // newForm[tempQKey]
//   }
// }

const newObj = {};

quizForm.forEach(({qcontent, acontent}) => {
  if(!newObj[qcontent]) {
    newObj[qcontent]=[];
  }
  newObj[qcontent].push(acontent);
})
console.log(newObj);

for (question in newObj) {
  console.log(question);
  for(answer of question) {
    // console.log(answer);
  }
}

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

