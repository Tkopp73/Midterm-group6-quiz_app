const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersByEmail = (email) => {
  const querryString = `SELECT id FROM users WHERE email = $1;`
  const input = [email]

  return db.query(querryString, input)
  .then(result => {
    console.log(result.rows);
    return result.rows;
  })
  .catch(err => {
    console.log(err.message);
    return err;
  });
}


module.exports = { getUsers, getUsersByEmail };
