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

const createConference = (request, response) => {
  const jsonData = request.body;

  pool.query(
    'INSERT INTO "Conferences" ("Name", "Description", "Date", "End_date", "Max_number_of_attendees", "Price") VALUES ($1, $2, $3, $4, $5, $6)',
    [
      jsonData.title,
      jsonData.description,
      jsonData.dateStart,
      jsonData.dateEnd,
      jsonData.maxAttendeesNumber,
      jsonData.price,
    ],
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

const deleteConference = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM "Conferences" WHERE ID = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Conference with ID=${id} deleted successfully`);
    }
  );
};

module.exports = {
  getConferences,
  getConferenceByID,
  createConference,
  updateConference,
  deleteConference,
};
