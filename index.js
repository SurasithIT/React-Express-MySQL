const express = require("express");
const mysql = require("mysql");

const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "StoreDB",
  insecureAuth: "true"
});

connection.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstname: "John", lastname: "Nonlen" },
    { id: 2, firstname: "Alan", lastname: "Smith" },
    { id: 3, firstname: "Alis", lastname: "Smun" }
  ];
  res.json(customers);
});

app.get("/api/products", (req, res) => {
  connection.query("SELECT * FROM Product", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
