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

const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false, // Necessary if using self-signed SSL certificates
    },
  });
} else {
  sequelize = new Sequelize({
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
}

module.exports = sequelize;