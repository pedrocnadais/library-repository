// const { Pool } = require('pg');
// require('dotenv').config();

// const bookListPool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   connectionString: process.env.INTERNAL_DB_URL,
//   ssl: {
//     rejectUnauthorized: false, // Necessary if using self-signed SSL certificates
//   }
// })

// module.exports = { bookListPool };

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  ssl: {
    rejectUnauthorized: false, // Necessary if using self-signed SSL certificates
  },
});

// Define BookSuggestion model for book_suggestion table
const BookSuggestion = sequelize.define('BookSuggestion', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define Book model for books_list table
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Additional columns as needed
});

// Synchronize models with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Export the models
module.exports = {
  sequelize,
  BookSuggestion,
  Book,
};
