
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

