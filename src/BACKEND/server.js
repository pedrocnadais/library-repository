// const express = require("express");
// const cors = require("cors");
// const { bookListPool } = require("./database")
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 10000;

// app.use(express.json());
// app.use(cors());

// // Receive suggestions
// app.post("/suggestion", (req, res) => {
//   const { title, author } = req.body;

//   console.log("Title: " + title);
//   console.log("Author: " + author);

//   const insertSuggestionQuery = `INSERT INTO book_suggestion (title, author) VALUES ($1, $2) RETURNING *`;

//   bookListPool.query(insertSuggestionQuery, [title, author])
//     .then((response) => {
//       console.log("Data saved");
//       console.log(response.rows);
//       res.send("Response received: " + JSON.stringify(response.rows));
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// // Display the items on the frontend
// app.get("/books", async (req, res) => {
//   try {
//     const { database } = req.query; 
//     if (database && database !== 'book_list') {
//       return res.status(400).json({ error: 'Invalid database name' });
//     }

//     const selectBooksQuery = `SELECT * FROM books_list`;

//     bookListPool.query(selectBooksQuery)
//       .then((results)=>{
//         res.json(results.rows);
//       })
//       .catch((error)=>{
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal server error" });
//       })
//   } catch (error) {
//     console.error("the error is:", error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Import sequelize instance from database.js
const { sequelize, BookSuggestion, Book } = require("./database");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Receive suggestions
app.post("/suggestion", async (req, res) => {
  const { title, author } = req.body;

  try {
    const newBook = await BookSuggestion.create({ title, author });
    console.log("Suggestion saved:", newBook.toJSON());
    res.json(newBook);
  } catch (error) {
    console.error("Error saving suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Display the items on the frontend
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
