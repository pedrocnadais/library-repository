const { Pool } = require('pg');

const bookListPool = new Pool({
  host: 'localhost',
  database: 'book_list',
  user: 'vivian',
  password: '',
  port: 5432
})

module.exports = { bookListPool };