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

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await client.query(query, [email]);

    if (rows.length === 1) {
      if (rows[0].password === password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
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

app.delete('/api/delete/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const query = 'DELETE FROM users WHERE email = $1';
    const result = await client.query(query, [email]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/profile/update', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const query = 'UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE email = $4';
    const result = await client.query(query, [firstName, lastName, password, email]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await client.query(query, [email]);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
