// Import required packages
const express = require("express"); //Import Express framework to build server and routes
const dotenv = require("dotenv"); //Import dotenv to load environment variables from .env file
const path = require("path"); //Import path module (built-in) to handle file paths safely

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
let students = [
  {
    id: 1,
    name: "favour",
    email: "favour@gmail.com",
    gender: "female",
    phoneNumber: "080123467984",
  },
  {
    id: 2,
    name: "daniel",
    email: "daniel@gmail.com",
    gender: "male",
    phoneNumber: "080123467984",
  },
  {
    id: 3,
    name: "levison",
    email: "levison@gmail.com",
    gender: "female",
    phoneNumber: "080123467984",
  }
];

// ------ROUTES-----
// GET / Read all the students name,email,gender, phone Number.
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET SINGLE student
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json(student);
});

// ------ROUTES-----
// POST / Create a student
app.post("/students", (req, res) => {
  // Destructure values from request body
  // `|| {}` prevents error if req.body is undefined
  let { name, email, gender, phoneNumber } = req.body || {};

  // Validation: Check if any required field is missing or empty
  // After trimming, empty spaces become "" --> falsy --> caught here
  if (!name || !email || !gender || !phoneNumber) {
    return res.status(400).json({
      error: "Name, Email, Gender, and Phone Number are required",
    });
  }

  // Create a new student object
  // ID is auto-generated using array length
  const newStudent = {
    id: students.length + 1,
    name,
    email,
    gender,
    phoneNumber,
  };

  // Save the new student into the in-memory database (array)
  students.push(newStudent);

  // Send success response with status 201 (Created)
  // Returns the newly created student
  res.status(201).json(newStudent);
});

// UPDATE student (PATCH)
app.patch("/students/:id", (req, res) => {
  //  Extract the ID from the URL (e.g., /students/2 → id = "2")
  // parseInt converts it from string → number
  const id = parseInt(req.params.id);

  //  Find the student in the array whose id matches the requested id
  // .find() returns the FIRST matching object or undefined if not found
  const student = students.find((s) => s.id === id);

  //  If no student is found, return a 404 error (resource not found)
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  //  Extract fields from request body
  // "|| {}" prevents error if req.body is undefined
  let { name, email, gender, phoneNumber } = req.body || {};

  //  Ensure at least ONE field is provided for update
  // Prevents empty request like: {}
  if (!name && !email && !gender && !phoneNumber) {
    return res.status(400).json({
      error: "At least one field is required to update",
    });
  }

  //  Validate email ONLY if user is trying to update it
  // Prevents invalid email formats
  if (email && (!email.includes("@") || !email.includes("."))) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  //  Update fields ONLY if they are provided (partial update behavior)
  // This ensures existing values are not overwritten unnecessarily
  if (name) student.name = name;
  if (email) student.email = email;
  if (gender) student.gender = gender;
  if (phoneNumber) student.phoneNumber = phoneNumber;

  //  Send back the updated student object
  // 200 status = successful update
  res.status(200).json(student);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  //  Extract the ID from the URL
  // Example: DELETE /students/3 ---> req.params.id = "3"
  // parseInt converts it from string ---> number
  const id = parseInt(req.params.id);

  //  Check if a student with this ID exists in the array
  // .some() returns true if at least one match is found
  const exists = students.some((s) => s.id === id);

  //  If no student is found, return 404 (Not Found)
  if (!exists) {
    return res.status(404).json({ error: "Student not found" });
  }

  //  Remove the student by keeping all students EXCEPT the one with matching ID
  // .filter() creates a new array without the deleted student
  students = students.filter((s) => s.id !== id);

  //  Send success response
  // 200 status = successful request
  res.status(200).json({ message: "Student deleted successfully" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
