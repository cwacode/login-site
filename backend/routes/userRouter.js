import express from 'express';
import client from '../database.js'

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM users');
      res.send(rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await client.query(query, [email]);
      if (rows.length === 1) {
        if (rows[0].password === password) {
          res.status(200).json({ message: 'Login successful', user_id: rows[0].user_id });
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
  
  
  router.post('/register', async (req, res) => {
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
  
  router.delete('/delete/:email', async (req, res) => {
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
  
  router.put('/profile/update', async (req, res) => {
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
  
  router.get('/profile/:email', async (req, res) => {
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

  export default router;