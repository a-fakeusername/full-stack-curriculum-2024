// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { auth, db } = require("./firebase");
const { collection, doc, getDocs, addDoc, deleteDoc } = require("firebase/firestore");

// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Your API routes will go here...

// GET: Endpoint to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await getDocs(collection(db, "tasks"));

    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });
    
    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// app.post("/login", async (req, res) => {
//   try {
//     // Fetching the email and password from the request body
//     const { email, password } = req.body;
//     // Checking if the email and password are not empty
//     if (!email || !password) {
//       return res.status(400).send("Email and password are required");
//     }
    
//     // Fetching the user with the provided email from Firestore
//     const userCredential = await signInWithEmailAndPassword(email, password);
//     res.status(200).send(userCredential.user);
//   } catch (error) {
//     // Sending an error response in case of an exception
//     res.status(500).send(error.message);
//   }
// });

// GET: Endpoint to retrieve all tasks for a user
app.get(`/tasks/:user`, async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await getDocs(collection(db, "tasks"));

    const user = req.params.user;

    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });

    tasks = tasks.filter((task) => task.user === user);
    
    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to add a new task
app.post(`/tasks`, async (req, res) => {
  try {
    // Fetching the task data from the request body
    const data = req.body;

    // Adding the task to the "tasks" collection in Firestore
    const addedTask = await addDoc(collection(db, "tasks"), data);

    res.status(201).send({
      id: addedTask.id,  // Automatically generated Document ID from Firestore
      ...data,
    });

  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// DELETE: Endpoint to remove a task
app.delete(`/tasks/:id`, async (req, res) => {
  try {
    // Fetching the task ID from the request parameters
    const id = req.params.id;

    // Deleting the task from the "tasks" collection in Firestore
    await deleteDoc(doc(db, "tasks", id));
    console.log("Deleted " + id);

    // Sending a successful response
    res.status(204).send();
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});