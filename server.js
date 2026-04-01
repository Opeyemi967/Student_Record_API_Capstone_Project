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
// GET / All students
app.get("/students", (req, res) => {
  // Define student data 
  const { name, email} = req.body; 

  // Prevent empty values & avoid errors when variables are not defined
  if (!name || !email || !name.trim() || !email.trim()) {
    return res.status(400).json({ error: "Name and Email are required" });
  }
  // Validate email address 
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  res.json({ name, email });
});

// ------CREATE USER (POST)---------
































// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
