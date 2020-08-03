const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/tasks", function (request, response) {
  response.status(200).send("Hello, this is your API!");
});

app.delete("/tasks", function () {});

app.post("/tasks", function () {});

app.put("/tasks", function () {});

module.exports.app = serverlessHttp(app);
