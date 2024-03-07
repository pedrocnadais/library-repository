const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Create Sequelize instance
const sequelize = new Sequelize('jciundjx', 'jciundjx', '7wrNB8VuSfiOQvVZoH9m1QseVyRx-4z9', {
  host: 'hansken.db.elephantsql.com',
  dialect: 'postgres', // Or the dialect of your database
});

// Define Book model
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  audio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  written: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define routes
app.post('/', async (req, res) => {
  try {
    const { title, author, img, audio, written } = req.body;
    const newBook = await Book.create({ title, author, img, audio, written });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync models with the database and start server
sequelize.sync().then(() => {
  console.log('Models synced with database');
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});

