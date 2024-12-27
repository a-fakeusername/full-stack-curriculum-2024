const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config();

// Parsing the FIREBASE_CREDENTIALS environment variable from a string into a JavaScript object
// Ensure you have set up FIREBASE_CREDENTIALS in your .env file.
// For reference, it should look something like this:
// FIREBASE_CREDENTIALS='{
//   "type": "service_account",
//   "project_id": "tpeo-todo-fc3e3",
//   ...
// }'
// Your .env file should be added to your .gitignore to keep sensitive data secure.
//  -> This is already done for you. But double check! You really don't want your credentials pushed to the web.

// const creds = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlb9VzQy1l-JFMI6LS82FLOj9ax_grm24",
  authDomain: "todo-2ad82.firebaseapp.com",
  projectId: "todo-2ad82",
  storageBucket: "todo-2ad82.firebasestorage.app",
  messagingSenderId: "1004456699335",
  appId: "1:1004456699335:web:5ec4a1f99e503de8bc65e2",
  measurementId: "G-1N0QRW3MLJ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const db = getFirestore(firebase);

module.exports = { firebase, auth, db };