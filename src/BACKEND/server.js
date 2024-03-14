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
require('dotenv').config();

// Import sequelize instance from database.js
const { sequelize, BookSuggestion, Book } = require("./database");

const app = express();
const PORT = process.env.RENDER_PORT || 10000;

app.use(express.json());
app.use(cors());

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('The DB is not synchronizing because:', error);
  }
})();

// Prefix all endpoints with "/api"
app.use('/api', (req, res, next) => {
  console.log('API request received');
  next();
});

// Receive suggestions
app.post("/api/suggestion", async (req, res) => {
  try {
    const { title, author } = req.body;
  
    const newSuggestion = await BookSuggestion.create({ title, author });

    console.log('data received');
    console.log("New suggestion sent:", newSuggestion.toJSON());
    res.json(newSuggestion);
  } catch (error) {
    console.error("Error saving suggestion because:", error);
    res.status(500).json({ error: "The error is in the internal server" });
  }
});

// Display the items on the frontend
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books because:", error);
    res.status(500).json({ error: "This is the internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
