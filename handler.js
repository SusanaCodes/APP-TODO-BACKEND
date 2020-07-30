const serverlessHttp = require("serverless-http");
const express = require("express");

const app = express();

app.get("/tasks", function () {});

app.delete("/tasks", function () {});

app.post("/tasks", function () {});

app.put("/tasks", function () {});
