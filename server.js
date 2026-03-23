// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Environment setup 
// it loads variables from .env file into process.env
dotenv.config();

// Create Express app
const app = express();

// Set PORT from environment or default to 3000
const PORT = process.env.PORT || 3000;


// MIDDLEWARE
// Middleware to parse JSON request body
app.use(express.json());

// Custom logger middleware
// Logs every request (method + URL)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // move to next middleware/route
});

// DUMMY DATABASE
// Temporary in-memory storage
let users = [];


// ------ROUTES-----
// GET
// app.get --- This handle a GET request
// "/" --- This is the root (URL) route
// (req, res) --- This function run when request and response comes in 
app.get("/", (req, res) => {
  res.send("My Student Record API is running!");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
