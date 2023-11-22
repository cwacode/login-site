const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', async (_request, response) => {
  try {
    const { rows } = await client.query('SELECT * FROM users');
    response.send(rows);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const query = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)';
    const result = await client.query(query, [email, password, firstName, lastName]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
