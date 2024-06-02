const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "conferences",
  password: "Se0db3f5092",
  port: "5432",
});

const getConferences = (request, response) => {
  pool.query('SELECT * FROM "Conferences"', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getConferenceByID = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM "Conferences" WHERE "ID" = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const updateConference = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, description } = request.body;

  pool.query(
    'UPDATE "Conferences" SET Name = $1, Description = $2 WHERE ID = $3',
    [title, description, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getConferences,
  getConferenceByID,
  updateConference,
};
