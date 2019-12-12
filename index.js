const express = require("express");
const mysql = require("mysql");

const app = express();

var con_StoreDB = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "StoreDB"
  // insecureAuth: "true"
});

var con_KeepSlipDB = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "KeepSlipDB"
  // insecureAuth: "true"
});

con_StoreDB.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("StoreDB connected!");
  }
});

con_KeepSlipDB.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("KeepSlipDB connected!");
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

// Store DB
app.get("/api/products", (req, res) => {
  con_StoreDB.query("SELECT * FROM Product", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

app.get("/api/invoices", (req, res) => {
  con_StoreDB.query("SELECT * FROM Invoice", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

app.get("/api/items", (req, res) => {
  con_StoreDB.query("SELECT * FROM Item", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

// KeepSlip DB
app.get("/api/stores", (req, res) => {
  con_KeepSlipDB.query("SELECT * FROM Store", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

app.get("/api/storeBranches", (req, res) => {
  con_KeepSlipDB.query("SELECT * FROM StoreBranch", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

app.get("/api/users", (req, res) => {
  con_KeepSlipDB.query("SELECT * FROM User", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

app.get("/api/invoiceOfUsers", (req, res) => {
  con_KeepSlipDB.query("SELECT * FROM Invoice_of_User", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

// Get all detail of invoice from Store DB
app.get("/api/invoiceFromStore", (req, res) => {
  con_StoreDB.query(
    "SELECT Invoice.id, Item.ItemNumber, Product.ProductName, Product.Price, Product.WarrantyTime, Item.Quantity FROM Invoice JOIN Item ON Invoice.id=Item.Invoice_id JOIN Product ON Item.Product_id=Product.id",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        return res.json(result);
      }
    }
  );
});

// Get all detail of invoice from KeepSlip DB
app.get("/api/invoiceFromKeepSlip", (req, res) => {
  con_KeepSlipDB.query(
    "SELECT KeepSlip_Invoice_id,Invoice_id,StoreName,StoreDetail, BranchName,BranchAddress, Firstname, Lastname, Email, PhoneNumber FROM Invoice_of_User JOIN StoreBranch ON Invoice_of_User.StoreBranch_Store_Id=StoreBranch.Branch_id JOIN Store ON StoreBranch.Store_id=Store.id JOIN User ON Invoice_of_User.User_id=User.id",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        return res.json(result);
      }
    }
  );
});

const port = 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
