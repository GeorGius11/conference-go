const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "conferences",
  password: "Se0db3f5092",
  port: "5432",
});

const getMembersForConference = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM "Members" JOIN "Members_Conferences" ON "Members"."ID" = "Members_Conferences"."Member_id" WHERE "Members_Conferences"."Conference_id"=$1;',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getReports = (request, response) => {
  pool.query('SELECT * FROM "Reports"', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getReportsForConference = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM "Reports" WHERE "Conference_id"=$1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getFeedbackForConference = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM "Conference_Feedbacks" WHERE "Conference_Feedbacks"."Conference_id"=$1;',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// const getFeedbackForReporter = (request, response) => {
//     const id = parseInt(request.params.id);

//     pool.query("SELECT * FROM \"Members\" JOIN \"Members_Conferences\" ON \"Members\".\"ID\" = \"Members_Conferences\".\"Member_id\" WHERE \"Members_Conferences\".\"Conference_id\"=$1;", [id], (error, results) => {
//         if (error) {
//             throw error;
//         }
//         response.status(200).json(results.rows);
//     });
// }

const getFeedbackForReporterInConference = (request, response) => {
  const cid = parseInt(request.params.cid);
  const rid = parseInt(request.params.rid);

  pool.query(
    `
    SELECT * FROM (\"Reports\" JOIN \"Members\" ON \"Members\".\"ID\" = \"Reports\".\"Member_id\")
    JOIN \"Reporter_Feedbacks\" ON \"Reporter_Feedbacks\".\"Member_id\"=\"Members\".\"ID\"
    WHERE \"Reports\".\"Conference_id\"=${cid} AND \"Members\".\"ID\" = ${rid};
    `,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const registerForConference = (request, response) => {
  var jsonData = request.body;

  pool.query(
    'INSERT INTO "Members_Conferences" ("Conference_id", "Member_id", "Has_paid", "Card_number") VALUES ($1, $2, TRUE, $3);',
    [jsonData.conferenceID, jsonData.memberID, jsonData.card],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Added Successfully");
    }
  );
};

const addReport = (request, response) => {
  var jsonData = request.body;
  console.log(jsonData);
  pool.query(
    'INSERT INTO "Reports" ("Conference_id", "Member_id", "Topic", "Description", "Duration", "Honorarium") VALUES ($1, $2, $3, $4, $5, $6);',
    [
      jsonData.conferenceID,
      jsonData.reporterID,
      jsonData.repTopic,
      jsonData.repDesc,
      jsonData.repDuration,
      jsonData.repHonorarium,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Added Successfully");
    }
  );
};

module.exports = {
  getMembersForConference,
  getReportsForConference,
  getReports,
  addReport,
  getFeedbackForConference,
  getFeedbackForReporterInConference,
  registerForConference,
};
