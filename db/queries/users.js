const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersByEmail = (email, password) => {
  const querryString = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const input = [email, password];

  return db.query(querryString, input)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log(err.message);
    return err;
  });
}

const getUsersById = (id) => {
  const querryString = `SELECT * FROM users WHERE id = $1`;
  const input = [id];

  return db.query(querryString, input)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log(err.message);
    return err;
  });
}


module.exports = { getUsers, getUsersByEmail, getUsersById };

