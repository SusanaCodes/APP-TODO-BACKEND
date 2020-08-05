const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "Tasks",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM Tasks", function (err, data) {
    if (err) {
      console.log("Error from MySql", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

app.delete("/tasks/:id", function (request, response) {
  const id = request.params.id;
  response.status(200).send(`Your task ${id} has now been deleted!`);
});

app.post("/tasks", function (request, response) {
  const data = request.body;
  const query = `INSERT INTO Tasks (Description, DueDate, Completed, Urgent) VALUES (?,?,?,?)`;
  connection.query(
    query,
    [data.Description, data.DueDate, false, data.Urgent],
    function (err, results) {
      if (err) {
        console.log("Error from MySql", err);
        response.status(500).send(err);
      } else {
        connection.query(
          `SELECT * FROM Tasks WHERE TaskId = ${results.insertId}`,
          function (err, results) {
            if (err) {
              console.log("Error from MySql", err);
              response.status(500).send(err);
            } else {
              response.status(201).send(results[0]);
            }
          }
        );
      }
    }
  );
});

app.put("/tasks/:id", function (request, response) {
  const id = request.params.id;
  const data = request.body;
  response
    .status(200)
    .send(
      `Your task ${id} and data ${JSON.stringify(data)} has now been amended!`
    );
});

module.exports.app = serverlessHttp(app);
