const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "conferences",
  password: "Se0db3f5092",
  port: "5432",
});

const tryLogin = (req, res, completion) => {
  console.log("try login");
  const { username, password } = req.body;
  const sql = "SELECT * FROM pg_user WHERE usename = ? AND passwd = ?";
  pool.query(sql, [username, password], (err, results) => {
    completion(req, res, true);
  });
};

const getMembers = (request, response) => {
  pool.query('SELECT * FROM "Members"', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getMemberWithID = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM "Members" WHERE "ID" = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  tryLogin,
  getMembers,
  getMemberWithID,
};
